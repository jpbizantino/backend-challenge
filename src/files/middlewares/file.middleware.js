import { logger } from '../../common/loggers/logger.js'

export const checkFileName = async (req, res, next) => {
  let stdResponse = {
    error: true,
    message: 'Invalid fileName format',
    data: []
  }

  try {
    // Get fileName from Query Parameter
    const fileName = req.query.fileName

    if (fileName) {
      const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,<>/?~]/

      // Check if fileName parameter exist and is valid
      if (format.test(fileName)) {
        stdResponse = {
          ...stdResponse,
          message: 'fileName is not a valid parameter'
        }

        return res.status(400).json(stdResponse)
      }
    }

    return next()
  } catch (error) {
    logger.log({
      level: 'error',
      message:
        checkFileName.name +
        ': ' +
        (error instanceof Error ? error.message : 'Unknown error.')
    })

    return res.status(400).json(stdResponse)
  }
}
