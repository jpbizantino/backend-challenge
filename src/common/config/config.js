import { config } from 'dotenv'
config()

export const NODE_ENV = process.env.NODE_ENV || 'production'
export const API_BASE = process.env.API_BASE || 'https://echo-serv.tbxnet.com/v1'
export const API_TOKEN = process.env.API_TOKEN || 'aSuperSecretKey'
export const PORT = process.env.PORT || 3000
