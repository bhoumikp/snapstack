import express from 'express'
import { fetchController } from '../controllers/fetch.controller.js'
import { mediaController } from '../controllers/media.controller.js'
import { pdfController } from '../controllers/pdf.controller.js'

const router = express.Router()

// Fetch Routes
router.post('/fetch', fetchController.fetch);

// Media Routes
router.get('/media/:token', mediaController.get);

// PDF Routes
router.post('/pdf', pdfController.generate);

export default router