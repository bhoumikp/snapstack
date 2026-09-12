import { Request, Response } from "express";
import { validatePostUrl } from "../validators/post-url.validator.js";
import { instagramProvider } from "../providers/instagram/instagram.provider.js";

export const fetchController = {
    fetch: async (req: Request, res: Response) => {
        const {url} = req.body;
        
        const urlValidation = validatePostUrl(url);
        if(!urlValidation.valid) {
            return res.status(400).json({
                success: false,
                message: urlValidation.message
            })
        }

        const data = await instagramProvider.getMetadata(url);

        res.status(200).json({
            success: true,
            message: 'Post fetched successfully.',
            data
        })
    },
}