// tslint:disable:quotemark

import { four04App } from "./../../../misc/four04-app";
import { Origin } from "./../../../models/origin.model";
import * as express from "express";
import { IHandlerFactory } from "../../../interfaces";
import { HostConfigException } from "../../../exceptions";
import { ConfigValidator } from "./../../../validators";
import { Host } from "./../../../models";
import { PROXIES_HOST_CONFIG_SCHEMA } from "../../../json-schemas/proxies-host-config.schema";
import * as proxy from "http-proxy-middleware";
import { NOT_FOUND } from "http-status-codes";
export class ProxyHandlerFactory implements IHandlerFactory {
  private _app: express.Express;

  private _applyProxies(host:Host) {
    host.origins.forEach(origin => {
    const router = {};
    // router[origin.hostname] = host.target;
    router[`${origin.hostname}:${process.env.PORT}${origin.path}`] = host.target;
    router[`${origin.hostname}:${process.env.S_PORT}${origin.path}`] = host.target;
    Object.keys(router).forEach(key=>{
      console.log(`Creating router for ${key} --->  ${router[key]}` )
    })
    const targetOptions = Object.assign({}, host.options, {target:host.target, router:router});
    const proxyApp: any = proxy(targetOptions);
      this.getApp().use(proxyApp);
    });
  }
  constructor() {
    this._app = express();
    this.setup();
  }
  createHandler(host: Host) {
    try {
      ConfigValidator.validate(host, PROXIES_HOST_CONFIG_SCHEMA);
        this._applyProxies(host);
    } catch (err) {
    }
  }

  setup() {}
  getApp() {
    return this._app;
  }
}

