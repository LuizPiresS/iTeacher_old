import express from 'express'
import { createConnection } from 'typeorm'

import connectionOptions from './database/ormconfig'
import { UserRoutes } from './adapters/express/routes/user.routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    // this.express.use(cors);
  }

  private async routes (): Promise<void> {
    await createConnection(connectionOptions)
    UserRoutes()
  }
}

export default new App().express
