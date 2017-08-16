// tslint:disable:quotemark
import { HostsConfigMock } from './../../mocks/hosts.config.mock';
import * as express from "express";
import { MainHandler } from "./main-handler";
import { ConfigManager } from "../../services/config-manager";
import {
  ChildAppHandlerFactory,
  ProxyHandlerFactory
} from "../../factories";
import { HostConfigException } from "../../exceptions/index";

describe("MainHandler", () => {
  beforeAll(()=>{
    spyOn(HostConfigException, 'throw');
    spyOn(ConfigManager, "getHostConfig").and.returnValue(HostsConfigMock);
  });
  beforeEach(() => {
    process.env.NODE_ENV = "development";
  });
  it("should implement all required methods", () => {
    const handler = new MainHandler();
    expect(handler.setup).toBeDefined();
    expect(handler.getApp).toBeDefined();
  });
  it("should perform setup when instatianted", () => {
    spyOn(MainHandler.prototype, "setup");
    const handler = new MainHandler();
    expect(handler.setup).toHaveBeenCalled();
  });

  describe("Setup", () => {
    it("should setup express app", () => {
      const handler: any = new MainHandler();
      handler.setup();
      expect(handler._app).toBeDefined();
    });
    it("should get host config from config service", () => {
      const handler: any = new MainHandler();
      handler.setup();
      expect(ConfigManager.getHostConfig).toHaveBeenCalled();
    });

    it("should create single instance of handler", () => {
      const handler: any = new MainHandler();
      spyOn(ProxyHandlerFactory.prototype, "setup");
      handler.setup();
      expect(ProxyHandlerFactory.prototype.setup).toHaveBeenCalledTimes(1);
    });

    it("should create single instance of handler", () => {
      const handler: any = new MainHandler();
      spyOn(ChildAppHandlerFactory.prototype, "setup");
      handler.setup();
      expect(ChildAppHandlerFactory.prototype.setup).toHaveBeenCalledTimes(1);
    });

    it("should create proxy for all hosts with proxy type", () => {
      const handler: any = new MainHandler();
      spyOn(ProxyHandlerFactory.prototype, "createHandler");
      handler.setup();
      expect(ProxyHandlerFactory.prototype.createHandler).toHaveBeenCalledTimes(1);
    });

    it("should create app for all hosts with app type", () => {
      const handler: any = new MainHandler();
      spyOn(ChildAppHandlerFactory.prototype, "createHandler");
      handler.setup();
      expect(ChildAppHandlerFactory.prototype.createHandler).toHaveBeenCalledTimes(1);
    });

    it("should apply created handlers to express app", () => {
      const childApp = express();
      const proxyApp = express();
      spyOn(ChildAppHandlerFactory.prototype, 'getApp').and.returnValue(childApp);
      spyOn(ProxyHandlerFactory.prototype, 'getApp').and.returnValue(proxyApp);
      
      const handler: any = new MainHandler();

      spyOn(handler.getApp(), 'use');
      handler.setup();

      expect(handler.getApp().use).toHaveBeenCalledWith(childApp);
      expect(handler.getApp().use).toHaveBeenCalledWith(proxyApp);
    });

  });

  
  describe('GetApp', ()=>{
      it('should return express app', ()=>{
      const handler = new MainHandler();
      const app =handler.getApp();
      expect(app).toBeTruthy();
      });
  });
});
