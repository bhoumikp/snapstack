import express from 'express'
import { fetchController } from '../controllers/fetch.controller.js'
import { mediaController } from '../controllers/media.controller.js'

const router = express.Router()

router.post('/fetch', fetchController.fetch);
router.get('/media/:token', mediaController.get);

export default router