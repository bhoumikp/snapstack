export type MediaType = 'image' | 'video';

export interface MediaItem {
    type: MediaType;
    url: string;
    width: number;
    height: number;
    thumbnail?: string;
}

export type PostType = 'image' | 'carousel' | 'reel';

export interface PostMetadata {
    type: PostType;
    shortcode: string;
    caption?: string;
    media: MediaItem[];
}

export interface InstagramMediaCandidate {
    url: string;
    width: number;
    height: number;
}

export interface InstagramMedia {
    media_type: 1 | 2;

    image_versions2?: {
        candidates: InstagramMediaCandidate[];
    };

    video_versions?: InstagramMediaCandidate[];
}

export interface InstagramCarouselItem extends InstagramMedia {}