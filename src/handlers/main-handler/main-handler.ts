// tslint:disable:quotemark
import * as express from "express";
import { ConfigManager } from "../../services/config-manager";
import {
  ChildAppHandlerFactory,
  ProxyHandlerFactory
} from "../../factories";

export class MainHandler {
  
  private _app: express.Express;
  
  setup() {
    const config = ConfigManager.getHostConfig();
    const proxyHandler = new ProxyHandlerFactory;
    const appHandler = new ChildAppHandlerFactory;
    config.proxies.forEach(host=>{
        proxyHandler.createHandler(host);
    });
    config.apps.forEach(host=>{
      appHandler.createHandler(host);
    });

    this._app.use(appHandler.getApp());
    this._app.use(proxyHandler.getApp());
  }
  getApp() {
    return this._app;
  }

  constructor() {
    this._app = express();
    this.setup();
  }
   
}
