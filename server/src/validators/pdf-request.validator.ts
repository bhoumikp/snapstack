const MAX_PDF_MEDIA = 20;

export interface PdfMediaItem {
    mediaUrl: string;
}

export interface PdfRequest {
    media: PdfMediaItem[];
}

interface ValidationResult {
    valid: boolean;
    message?: string;
}

export const validatePDFRequest = (
    media: unknown
): ValidationResult => {

    if (!Array.isArray(media)) {
        return {
            valid: false,
            message: "Media must be an array."
        };
    }

    if (media.length < 1 || media.length > MAX_PDF_MEDIA) {
        return {
            valid: false,
            message: "Min 1 and Max 20 images are allowed in a PDF."
        };
    }

    for (const item of media) {
        if (
            !item ||
            typeof item !== "object" ||
            typeof item.mediaUrl !== "string" ||
            !item.mediaUrl.trim()
        ) {
            return {
                valid: false,
                message: "Each media item must contain a valid media URL."
            };
        }
    }

    return {
        valid: true
    };
};