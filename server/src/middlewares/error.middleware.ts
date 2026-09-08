import { ErrorRequestHandler } from "express";

export const errorMiddleware : ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message,
    })
}