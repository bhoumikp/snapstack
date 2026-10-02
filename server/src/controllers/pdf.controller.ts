import { Request, Response } from "express";
import { generatePDF } from "../services/pdf.service.js";
import { validatePDFRequest } from "../validators/pdf-request.validator.js";

export const pdfController = {
    generate: async (req: Request, res: Response) => {
        const { media, filename } = req.body;

        const validation = validatePDFRequest(media);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const pdf = await generatePDF(media);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${ filename ? filename : "snapstack-carousel.pdf"}`
        );

        res.send(Buffer.from(pdf));
    }
}