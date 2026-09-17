export type PostType = 'image' | 'carousel' | 'reel';

export type MediaType = 'image' | 'video';

export interface MediaItem {
    type: MediaType;
    mediaUrl: string;
    width: number;
    height: number;
    thumbnail?: string;
}

export interface PostMetadata {
    type: PostType;
    shortcode: string;
    caption?: string;
    media: MediaItem[];
}

export interface FetchResponse {
    success: boolean;
    message: string;
    data: PostMetadata;
}