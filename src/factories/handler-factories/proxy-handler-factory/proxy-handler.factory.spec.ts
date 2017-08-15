// tslint:disable:quotemark
import { ProxyHandlerFactory } from './proxy-handler.factory';
import * as proxy from "http-proxy-middleware";
import * as express from "express";

describe("ProxyHandler", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "development";
  });
  it("should contain all required methods and properties", () => {
    expect(ProxyHandlerFactory).toImplementIHandlerFactory();
  });
  describe("getApp", () => {
    it("should return an express app", () => {
      const handler = new ProxyHandlerFactory();
      expect(typeof handler.getApp()).toEqual(typeof express());
    });
  });
  // describe("setup", () => {
  //   it("should get host array from host config", () => {
  //     const handler = new ProxyHandler();
  //     spyOn(ConfigManager, "getHostConfig");
  //     handler.setup();
  //     expect(ConfigManager.getHostConfig).toHaveBeenCalled();
  //   });
  //   it("should initialize proxies defined in config", () => {
  //     const handler = new ProxyHandler();
  //     handler.setup();
  //     expect(typeof handler.getApp()).toEqual(typeof express());
  //   });
  // });
});
