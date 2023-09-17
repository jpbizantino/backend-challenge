import * as winston from 'winston'
import * as fs from 'fs'

const dir = 'log'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const timezoned = () => {
  return new Date().toLocaleString('sp-AR', {
    timeZone: 'America/Argentina/Buenos_Aires'
  })
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      dirname: dir
    }),
    new winston.transports.File({
      filename: 'error.log',
      dirname: dir,
      level: 'error'
    })
  ]
})

// logger.add(
//   new winston.transports.Console({
//     format: winston.format.simple()
//   })
// )
