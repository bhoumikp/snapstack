import { Request, Response } from "express";
import { verifyMediaToken } from "../utils/media-token.js";
import { validateMediaUrl } from "../validators/media-url.validator.js";
import { Readable } from "node:stream";
import { getFileExtension } from "../utils/media-file.js";

export const mediaController = {
    get: async (req: Request, res: Response) => {
        const {token} = req.params;

        const {mediaUrl, mediaId} = verifyMediaToken(token as string);
        const isMediaUrlValid = validateMediaUrl(mediaUrl);

        if(!isMediaUrlValid) {
            return res.status(403).json({
                success: false,
                message: "The media url is invalid"
            })
        } 

        const response = await fetch(mediaUrl);

        if (!response.ok || !response.body) {
            throw new Error(
                `Failed to fetch media from Instagram: ${response.status}`
            );
        }

        const contentType = response.headers.get("content-type");

        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }

        const contentLength = response.headers.get("content-length");

        if (contentLength) {
            res.setHeader("Content-Length", contentLength);
        }

        const shouldDownload = req.query.download === "true";
        const extension = getFileExtension(contentType);
        const filename = mediaId ? `snapstack-${mediaId}.${extension}` : `snaptsack-media.${extension}`
        const contentDispostion = shouldDownload ? `attachment; filename=${filename}` : "inline";
        res.setHeader("Content-Disposition", contentDispostion);

        Readable.fromWeb(response.body).pipe(res);
    }
}