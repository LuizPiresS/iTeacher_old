import 'module-alias/register'
import 'reflect-metadata'
import express from 'express'

const app = express()
app.get('/', (_req, res) => {
  res.send('Teste')
})
const PORT = process.env.PORT || 1313
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
