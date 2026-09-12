import { buildMediaUrl } from "../../utils/media-url.js";
import { getBestCandidate, getMediaType, getPostType } from "./instagram.media.js";
import { MediaItem, InstagramCarouselItem, PostMetadata, InstagramMediaCandidate, InstagramMedia} from "./instagram.types.js";

export const extractPostMetadata = (data: any) : PostMetadata => {
    if(!data)
        throw new Error("Unable to extract the data!");

    const post = data.xdt_api__v1__media__shortcode__web_info.items[0];
    const postCarousel = post.carousel_media;
    
    const postType = getPostType(post.product_type);
    const shortcode = post.code;
    const caption = post.caption?.text;
    const media: MediaItem[] = [];

    switch (postType) {
        case 'image':
            media.push(extractMediaItem(post));
            break;

        case 'reel':
            media.push(extractMediaItem(post));
            break;

        case 'carousel':
            media.push(...extractCarouselMedia(postCarousel));
            break;

        default:
            throw new Error(`Unknown post type: ${postType}`);
    }

    return {
        type: postType,
        shortcode,
        caption,
        media,
    }
}

const extractCarouselMedia = (candidates: InstagramCarouselItem[]) : MediaItem[] => {
    if (candidates.length === 0) {
        throw new Error('No media candidates found');
    }
    return candidates.map(candidate => extractMediaItem(candidate));
}

const extractMediaItem = (item: InstagramMedia): MediaItem => {
    let bestCandidate: InstagramMediaCandidate | null = null;
    let thumbnailCandidate: InstagramMediaCandidate | null = null;

    const mediaType = getMediaType(item.media_type);

    if (mediaType === 'image' && item.image_versions2) {
        bestCandidate = getBestCandidate(item.image_versions2.candidates);
    }

    if (mediaType === 'video' && item.video_versions) {
        bestCandidate = getBestCandidate(item.video_versions);
    }
    
    if (mediaType === 'video' && item.image_versions2) {
        thumbnailCandidate = getBestCandidate(item.image_versions2?.candidates);
    }

    if(!bestCandidate) {
        throw new Error(`Unable to extract media item`);
    }

    return {
        type: mediaType,
        mediaUrl: buildMediaUrl(bestCandidate.url, item.id),
        width: bestCandidate.width,
        height: bestCandidate.height,
        thumbnail:  thumbnailCandidate
                ? buildMediaUrl(thumbnailCandidate.url, item.id)
                : undefined,
    };
};

