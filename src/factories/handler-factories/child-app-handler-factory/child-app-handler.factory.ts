// tslint:disable:quotemark

import { four04App } from "./../../../misc/four04-app";
import { Origin } from "./../../../models/origin.model";
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import { IHandlerFactory } from "../../../interfaces";
import { HostConfigException } from "../../../exceptions";
import { ConfigValidator } from "./../../../validators";
import { Host } from "./../../../models";
import { APPS_HOST_CONFIG_SCHEMA } from "../../../json-schemas/apps-host-config.schema";
import * as vhost from "vhost";
import { NOT_FOUND } from "http-status-codes";
export class ChildAppHandlerFactory implements IHandlerFactory {
  private _app: express.Express;

  private _applyOrigins(origins: [Origin], hostApp) {
    let result = '';
    origins.forEach(origin => {
      const vhostApp: any = vhost(origin.hostname, hostApp);
      this.getApp().use(vhostApp);
      result += `${origin.hostname}, `
    });
    return result;
  }
  constructor() {
    this._app = express();
    this.setup();
  }
  createHandler(host: Host) {
      let result = {};
      try {
      ConfigValidator.validate(host, APPS_HOST_CONFIG_SCHEMA);
      try {
        let hostApp = require(host.target.path).Server.bootstrap().getApp();
        const applied = this._applyOrigins(host.origins, hostApp);
        result = {HOST_APP:host.target.path, status:`Loaded for ${applied}`};
      } catch (e) {
        this._applyOrigins(host.origins, four04App);
        result = {HOST_APP:host.target.path, status:`Failed, ${e}`};
      }
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  setup() {}
  getApp() {
    return this._app;
  }
}
