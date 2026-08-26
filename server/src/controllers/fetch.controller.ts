import { Request, Response } from "express";
import { validateUrl } from "../validators/url.validator.js";

export const fetchController = {
    fetch: async (req: Request, res: Response) => {
        const {url} = req.body;
        
        const urlValidation = validateUrl(url);
        if(!urlValidation.valid) {
            return res.status(400).json({
                success: false,
                message: urlValidation.message
            })
        }

        res.status(200).json({
            success: true,
            message: 'Fetch request validated successfully.'
        })
    }
}