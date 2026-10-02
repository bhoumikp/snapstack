import { PDFDocument } from "pdf-lib";
import { verifyMediaToken } from "../utils/media-token.js";
import { validateMediaUrl } from "../validators/media-url.validator.js";
import type { MediaItem } from "../providers/instagram/instagram.types.js";
import sharp from "sharp";

export const generatePDF = async (
    media: MediaItem[]
): Promise<Uint8Array> => {

    const pdfDoc = await PDFDocument.create();

    for (const item of media) {

        const token = item.mediaUrl.split('/').pop();   

        if (!token) {
            throw new Error("Invalid media URL.");
        }

        const {mediaUrl: originalUrl} = verifyMediaToken(token);

        validateMediaUrl(originalUrl);

        const response = await fetch(originalUrl);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch media: ${response.status}`
            );
        }

        const contentType = response.headers
            .get("content-type")
            ?.split(";")[0]
            .trim()
            .toLowerCase();

        if (!contentType?.startsWith("image/")) {
            throw new Error("PDF can only contain images.");
        }

        const imageBytes = await response.arrayBuffer();

        const jpegBuffer = await sharp(imageBytes)
            .jpeg()
            .toBuffer();

        const image = await pdfDoc.embedJpg(jpegBuffer);

        const { width, height } = image.scale(1);

        const page = pdfDoc.addPage([width, height]);

        page.drawImage(image, {
            x: 0,
            y: 0,
            width,
            height
        });
    }

    // 8. Generate PDF bytes
    return await pdfDoc.save();
};