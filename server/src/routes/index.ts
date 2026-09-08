import express from 'express'
import { fetchController } from '../controllers/fetch.controller.js'

const router = express.Router()

router.post('/fetch', fetchController.fetch)

export default router