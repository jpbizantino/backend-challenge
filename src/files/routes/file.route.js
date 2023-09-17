import express from 'express'
import { getProcessedData, getRawdData } from '../controllers/file.controller.js'
import { checkFileName } from '../middlewares/file.middleware.js'

const router = express.Router()

router.get('/data', checkFileName, getProcessedData)

router.get('/list', getRawdData)

export default router
