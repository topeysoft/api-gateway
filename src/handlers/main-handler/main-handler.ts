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
    const appHandler = new ChildAppHandlerFactory;
    const proxyHandler = new ProxyHandlerFactory;
    config.proxies.forEach(host=>{
        proxyHandler.createHandler(host);
    });
    let appsResults = [];
    config.apps.forEach(host=>{
      appsResults.push(appHandler.createHandler(host));
     
    });
if(appsResults && appsResults.length>0){
      appsResults.forEach(r=>{
        console.log(r);
      });
     } 
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
