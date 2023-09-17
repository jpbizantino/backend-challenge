import { fetchFileData, fetchFileList } from '../apis/file.api.js'
import { logger } from '../../common/loggers/logger.js'

/**
 * List all file retrieved from an external API
 * @returns JSON object with the follwing structure
 *  {
 *    error: boolean,
 *    message: string,
 *    data: []
 *  }
 *
 *   `Data model`
 *
 *  [
 *    {
 *      file: string,
 *      lines:  [
 *                {
 *                  text : string,
 *                  number: string,
 *                  hex: string
 *                }
 *              ]
 *    }
 *  ]
 */
export const listProcessedFiles = async (fileName) => {
  // Create standard message response to process any exception
  let stdResponse = {
    error: true,
    message: 'Error on retrieving files',
    data: []
  }

  const fileArray = []

  try {
    if (fileName) {
      const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,<>/?~]/

      // Check if fileName parameter exist and is valid
      if (format.test(fileName)) {
        return {
          ...stdResponse,
          message: 'fileName is not a valid parameter'
        }
      }
    }

    // Retrieve files from API
    const result = await fetchFileList()

    if (result.error) return { ...stdResponse, message: 'External API Error: ' + result.message }

    // Filter array if fileName is present
    if (fileName) result.data.files = result.data.files.filter((e) => e === fileName)

    // Run in parallel - Optimized algorithm using promises
    await Promise.all(
      result.data.files.map(async (element) => {
        await getFile(element).then((fileData) => {
          // Validate file
          if (!fileData) return

          fileArray.push(fileData)
        })
      })
    )

    // Run sequentially - Takes more time to do the same job
    /*
      for(const element of result) {
      await getFile(element).then((fileData) => {
          if(fileData === null) return
          finalResult.push(fileData)
      })
    }
    */

    stdResponse = {
      error: false,
      message: '',
      data: fileArray
    }
  } catch (error) {
    stdResponse = {
      ...stdResponse,
      message: (error instanceof Error ? error.message : 'Unknown error.')
    }

    logger.log({
      level: 'error',
      message:
          listProcessedFiles.name +
          ' : ' +
          stdResponse.message
    })
  }

  return stdResponse
}

/**
 * Get an specific fil from an external API
 * @param {string} fileName
 * @returns null if no data or JSON object
 *    {
 *      text : string,
 *      number: string,
 *      hex: string
 *    }
 */
const getFile = async (fileName) => {
  const ROW_SEPARATOR = '\n'
  const LINE_SEPARATOR = ','
  const COLUMNS = 4

  const lineArray = []
  let result = null

  try {
    // Validate fileName
    if (fileName.trim().length === 0) return null

    // Retrieve file lines from API
    const fileData = await fetchFileData(fileName)

    if (fileData.error || !fileData.data) return null

    const lines = fileData.data.split(ROW_SEPARATOR)

    // Start from line 1 to remove header
    for (let line = 1; line < lines.length; line++) {
      const fields = lines[line].split(LINE_SEPARATOR)

      // Validate columns length
      if (fields.length < COLUMNS) continue

      // Validate if data exist. *** Start from colum 1 ***
      for (let i = 1; i < COLUMNS; i++) {
        if (fields[i] === undefined || fields[i].trim().length === 0) continue
      }

      // Convert to number
      const castNumber = Number(fields[2])

      // Validate number
      if (!castNumber || typeof castNumber !== 'number') continue

      lineArray.push({
        text: fields[1],
        number: castNumber,
        hex: fields[3]
      })
    }

    if (!lineArray.length) return null

    result = {
      file: fileName,
      lines: lineArray
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message:
          getFile.name +
          ': ' +
          (error instanceof Error ? error.message : 'Unknown error.')
    })
  }

  return result
}

/**
 * List all file retrieved from an external API
 * @returns JSON object with the follwing structure
 *  {
 *    error: boolean,
 *    message: string,
 *    data: []
 *  }
 */
export const listRawFiles = async () => {
  // Create standard message response to process any exception
  let stdResponse = {
    error: true,
    message: 'Error on retrieving files',
    data: []
  }

  try {
    // Retrieve files from API
    const result = await fetchFileList()

    if (result.error) return { ...stdResponse, message: 'External API Error: ' + result.message }

    stdResponse = {
      error: false,
      message: '',
      data: result.data
    }
  } catch (error) {
    stdResponse = {
      ...stdResponse,
      message: (error instanceof Error ? error.message : 'Unknown error.')
    }

    logger.log({
      level: 'error',
      message:
          listProcessedFiles.name +
          ' : ' +
          stdResponse.message
    })
  }

  return stdResponse
}
