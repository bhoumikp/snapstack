import { ALLOWED_MEDIA_HOSTS } from "../constants/domains.js";

export const validateMediaUrl = (url: string) => {
    if (!url) {
        return false;
    }

    let parsedUrl: URL;

    try {
        parsedUrl = new URL(url);
    } catch {
        return false;
    }

    if (parsedUrl.protocol !== "https:") {
        return false;
    }

    return ALLOWED_MEDIA_HOSTS.includes(parsedUrl.hostname);
};