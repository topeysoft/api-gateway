// tslint:disable:quotemark
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import { IHandlerFactory } from "../../../interfaces";

export class ChildAppHandlerFactory implements IHandlerFactory{

  private _app: express.Express;

  constructor() {
    this._app = express();
    this.setup();
  }
  createHandler(host){

  }
  
  setup() {
  }
  getApp() {
    return this._app;
  }
}
