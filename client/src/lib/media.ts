const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const getMediaUrl = (mediaUrl: string | undefined) : string | undefined => {
    if (!mediaUrl) return;
    return `${API_URL}/${mediaUrl}`;
}

export const getDownloadUrl = (mediaUrl: string | undefined) : string | undefined => {
    if (!mediaUrl) return;
    const url = new URL(`${API_URL}/${mediaUrl}`);
    url.searchParams.set("download", "true");

    return url.toString();
};