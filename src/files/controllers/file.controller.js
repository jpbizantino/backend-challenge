import { logger } from '../../common/loggers/logger.js'
import { listProcessedFiles, listRawFiles } from '../services/file.service.js'

export const getProcessedData = async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json')

    // Get fileName from Query Parameter
    const fileName = req.query.fileName

    const result = await listProcessedFiles(fileName)

    if (result.error) return res.status(500).json(result)
    return res.status(200).json(result.data)
  } catch (error) {
    logger.log({
      level: 'error',
      message:
        getProcessedData.name +
        ': ' +
        (error instanceof Error ? error.message : 'Unknown error.')
    })
  }
}

export const getRawdData = async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json')

    const result = await listRawFiles()

    if (result.error) return res.status(500).json(result)
    return res.status(200).json(result.data)
  } catch (error) {
    logger.log({
      level: 'error',
      message:
        getProcessedData.name +
        ': ' +
        (error instanceof Error ? error.message : 'Unknown error.')
    })
  }
}
