// tslint:disable:quotemark
import { ChildAppHandlerFactory } from './child-app-handler.factory';
import * as proxy from "http-proxy-middleware";
import * as express from "express";

describe("ChildAppHandlerFactory", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "development";
  });
  it("should contain all required methods and properties", () => {
    const handler = new ChildAppHandlerFactory();
    expect(ChildAppHandlerFactory).toImplementIHandlerFactory();;
  });
  describe("getApp", () => {
    it("should return an express app", () => {
      const handler = new ChildAppHandlerFactory();
      expect(typeof handler.getApp()).toEqual(typeof express());
    });
  });
  // describe("setup", () => {
  //   it("should get host array from host config", () => {
  //     const handler = new ChildAppHandler();
  //     spyOn(ConfigManager, "getHostConfig");
  //     handler.setup();
  //     expect(ConfigManager.getHostConfig).toHaveBeenCalled();
  //   });
  //   it("should initialize proxies defined in config", () => {
  //     const handler = new ChildAppHandler();
  //     handler.setup();
  //     expect(typeof handler.getApp()).toEqual(typeof express());
  //   });
  // });
});
