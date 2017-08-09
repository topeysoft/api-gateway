import * as express from "express";
import * as path from "path";
import { ApiGateway } from "./gateway";
import { ConfigManager } from "./services/config-manager";

describe('ApiGateway', () => {
    beforeEach(()=>{
        process.env.NODE_ENV = 'development';
    })
    it('should contain required methods', () => {
        const gateway:any =new ApiGateway();
        expect(ApiGateway.bootstrap).toBeTruthy();
        expect(gateway.getApp).toBeTruthy();
        expect(gateway._setup).toBeTruthy();
    });
    
    describe('Bootstrap method', () => {
        it('should return an instance of ApiGateway', ()=>{
           expect(ApiGateway.bootstrap()).toEqual(jasmine.any(ApiGateway))
        });
    });
    describe('GetApp method', () => {
        it('should return an instance of express gateway', ()=>{
          const gateway = ApiGateway.bootstrap()
           expect(typeof(gateway.getApp())).toEqual(typeof( express()))
        });
    });
    describe('setup method', () => {
        it('should setup app with required middlewares ', ()=>{
          const gateway:any = ApiGateway.bootstrap();
          spyOn(gateway.getApp(), 'set');
          spyOn(gateway.getApp(), 'use');
          spyOn(express, 'static');
          spyOn(path, 'join');
          spyOn(gateway, 'logger');

          gateway._setup();
           expect(gateway.getApp().use).toHaveBeenCalledTimes(4);
           expect(gateway.getApp().set).toHaveBeenCalledTimes(2);
           expect(express.static).toHaveBeenCalledWith( path.join(__dirname, "public"));
           expect(path.join).toHaveBeenCalledWith(__dirname, "public");
           expect(path.join).toHaveBeenCalledWith(__dirname, "views");
           expect(gateway.logger).toHaveBeenCalledWith( "combined");
        });
    });
})