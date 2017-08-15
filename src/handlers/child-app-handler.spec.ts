import { ChildAppHandler } from './child-app-handler';
import * as proxy from 'http-proxy-middleware';
import * as express from 'express';
import { ConfigManager } from "../services/config-manager";

describe('ChildAppHandler', () => {
    beforeEach(()=>{
        process.env.NODE_ENV = 'development';
    });
    it('should contain all required methods and properties', () => {
        const handler = new ChildAppHandler;
        expect(handler.setup).toBeTruthy()
        expect(handler.getApp).toBeTruthy()
    });
    describe('getApp', () => {
        it('should return an express app', () => {
            const handler = new ChildAppHandler;
            expect(typeof(handler.getApp())).toEqual(typeof( express()));
        });
    });
    describe('setup', () => {
        it('should get host array from host config', () => {
            const handler = new ChildAppHandler;
            spyOn(ConfigManager, 'getHostConfig');
            handler.setup();
            expect(ConfigManager.getHostConfig).toHaveBeenCalled();
        });
        it('should initialize apps defined in config', () => {
            const handler = new ChildAppHandler;
            handler.setup();
            expect(typeof(handler.getApp())).toEqual(typeof( express()));
        });
    });
})