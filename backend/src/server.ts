import express, { Router } from 'express';
import { errorsHandler } from './middlewares/errors-handler.middleware';

/* singleton */

export class Server {
  static serverInstance: Server;
  public server;
  private constructor() {
    /*  */
    this.server = express();
    this.server.use(express.static('public'));
    this.server.use(express.json());
  }
  static getInstance() {
    if (!Server.serverInstance) {
      Server.serverInstance = new Server();
    }
    return Server.serverInstance;
  }
  public getRouter() {
    return Router();
  }
  public setRoute(path: string, url: Router) {
    this.server.use(path, url);
  }
  public run(port: number = 3000) {
    this.server.listen(port, () => {
      console.log('running on ' + port);
    });
  }
  public getExpressRef() {
    return this.server;
  }
  public defineMiddlewares() {
    this.server.use(errorsHandler);
  }
}
