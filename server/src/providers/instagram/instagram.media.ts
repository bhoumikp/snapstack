import { PostType, InstagramMediaCandidate, MediaType } from "./instagram.types.js";

export const getPostType = (postType: string): PostType => {
    switch (postType) {
        case 'feed':
            return 'image';
        case 'carousel_container':
            return 'carousel';
        case 'clips':
            return 'reel';
        default:
            throw new Error(`Unknown post type: ${postType}`);
    }
}

export const getMediaType = (mediaTytpe: number): MediaType => {
    switch (mediaTytpe) {
        case 1:
            return 'image';
        case 2:
            return 'video';
        default:
            throw new Error(`Unknown media type: ${mediaTytpe}`);
    }
}

export const getBestCandidate = (candidates: InstagramMediaCandidate[]): InstagramMediaCandidate => {
    // select the candidate with the largest resolution
    if (candidates.length === 0) {
        throw new Error('No media candidates found');
    }
    return candidates.reduce((best, current) => {
        return current.width * current.height > best.width * best.height ? current : best;
    });
};