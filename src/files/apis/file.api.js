import { axiosClient } from './base.api.js'
import { logger } from '../../common/loggers/logger.js'

export const fetchFileList = async () => {
  // Create standard message response to process any exception
  let stdResponse = {
    error: true,
    message: 'Error on fetching files',
    data: []
  }

  await axiosClient.get('/secret/files')
    .then(async (response) => {
      stdResponse = {
        error: false,
        message: '',
        data: response.data
      }
    })
    .catch((error) => {
      // TODO:
      // If we want to get more details about from the error, we can process error.response.data

      stdResponse = {
        ...stdResponse,
        message: (error instanceof Error ? error.message : 'Unknown error.')
      }

      logger.log({
        level: 'error',
        message:
          fetchFileList.name +
          ': ' +
          stdResponse.message
      })
    })

  return stdResponse
}

export const fetchFileData = async (fileName) => {
  // Create standard message response to process any exception
  let stdResponse = {
    error: true,
    message: 'Error on fetching file data',
    data: []
  }

  await axiosClient.get(`/secret/file/${fileName}`)
    .then(async (response) => {
      stdResponse = {
        error: false,
        message: '',
        data: response.data
      }
    })
    .catch((error) => {
      // TODO:
      // If we want to get more details about from the error, we can process error.response.data

      stdResponse = {
        ...stdResponse,
        message: ' fileName : ' + fileName + (error instanceof Error ? error.message : 'Unknown error.')
      }

      logger.log({
        level: 'error',
        message:
          fetchFileData.name +
          ': ' +
          stdResponse.message
      })
    })

  return stdResponse
}
