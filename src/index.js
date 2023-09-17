import express from 'express'
import cors from 'cors'
import { PORT } from './common/config/config.js'
import { logger } from './common/loggers/logger.js'
import fileRoutes from './files/routes/file.route.js'

const app = express()

// Settings
app.listen(PORT)

logger.log({
  level: 'info',
  message: 'Server on port: ' + PORT
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('json spaces', 4)

app.use(
  cors({
    // origin: "http://localhost:3000",
  })
)

// Set routers
app.use('/api/v1/files', fileRoutes)

export default app // for testing
