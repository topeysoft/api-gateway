// tslint:disable:quotemark
import { Server } from "./../../../mocks/child-app.mock";
import { Target } from "./../../../models/target.model";
import { Origin } from "./../../../models/origin.model";
import { Host } from "./../../../models";
import { HostConfigException } from "./../../../exceptions/host-config-exception/host-config.exception";
import { ProxyHandlerFactory } from "./proxy-handler.factory";
import * as proxy from "http-proxy-middleware";
import * as vhost from "vhost";
import * as express from "express";

const getMockHost = () => {
  const testOrigin = new Origin();
  testOrigin.hostname = "example.com";
  testOrigin.path = "./";
  const host = new Host();
  host.origins = [testOrigin];
  host.target = new Target();
  host.target.url = "http://localtest";
  return host;
};

describe("ProxyHandlerFactory", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "development";
    spyOn(HostConfigException, "throw");
  });
  it("should contain all required methods and properties", () => {
    const handler = new ProxyHandlerFactory();
    expect(ProxyHandlerFactory).toImplementIHandlerFactory();
  });
  describe("getApp", () => {
    it("should return an express app", () => {
      const handler = new ProxyHandlerFactory();
      expect(typeof handler.getApp()).toEqual(typeof express());
    });
  });
  describe("CreateHandler", () => {
    it("should throw HostConfigException when host is INVALID", () => {
      spyOn(
        ProxyHandlerFactory.prototype,
        "_applyProxies"
      ).and.callFake(() => {});
      const handler = new ProxyHandlerFactory();
      let host: Host = null;
      handler.createHandler(host);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(1);

      host = getMockHost();
      delete host.target;
      handler.createHandler(host);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(2);

      host = getMockHost();
      delete host.origins;
      handler.createHandler(host);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(3);

      host = getMockHost();
      delete host.origins[0].hostname;
      handler.createHandler(host);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(4);

      host = getMockHost();
      host.origins[0].hostname = "123@";
      handler.createHandler(host);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(5);

      let myHost: any = getMockHost();
      myHost.origins[0].path = 123;
      handler.createHandler(myHost);
      expect(HostConfigException.throw).toHaveBeenCalledTimes(6);
    });

    it("should NOT throw HostConfigException when host origins is VALID", () => {
      const handler = new ProxyHandlerFactory();
      handler.createHandler(getMockHost());
      expect(HostConfigException.throw).toHaveBeenCalledTimes(0);
    });
    describe("applying provided host to proxy instance when host is valid", () => {
      it("should apply  to proxy instance only one time with one origin", () => {
        const handler = new ProxyHandlerFactory();
        spyOn(handler.getApp(), "use");
        const host = getMockHost();
        handler.createHandler(host);
        expect(handler.getApp().use).toHaveBeenCalledTimes(1);
      });
      it("should apply  to express app instance multiple times with multiple origins", () => {
        const handler = new ProxyHandlerFactory();
        spyOn(handler.getApp(), "use");
        const host = getMockHost();
        const origin = new Origin();
        origin.hostname = "localtest";
        host.origins.push(origin);
        handler.createHandler(host);
        expect(handler.getApp().use).toHaveBeenCalledTimes(2);
      });
      
    });
  });
});
