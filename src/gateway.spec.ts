import * as express from "express";
import { ApiGateway } from "./gateway";

describe('ApiGateway should contain static method', () => {
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
        it('should return setup app with required middlewares ', ()=>{
          const gateway:any = ApiGateway.bootstrap();
          spyOn(gateway.getApp(), 'set');
          spyOn(gateway.getApp(), 'use');
          gateway._setup();
           expect(gateway.getApp().use).toHaveBeenCalledTimes(2);
           expect(gateway.getApp().set).toHaveBeenCalledTimes(2);
        });
    });
})