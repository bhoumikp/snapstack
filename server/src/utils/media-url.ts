import { createMediaToken } from "./media-token.js";

export const buildMediaUrl = (url: string, mediaId: string) : string => {
    const token = createMediaToken(url, mediaId);
    return `media/${encodeURIComponent(token)}`;
}