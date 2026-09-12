export const getFileExtension = (fileType: string | null): string => {
    switch (fileType) {
        case "image/jpeg":
            return "jpg";

        case "image/png":
            return "png";

        case "image/webp":
            return "webp";

        case "video/mp4":
            return "mp4";

        default:
            return "bin";
    }
}