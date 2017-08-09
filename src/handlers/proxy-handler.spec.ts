import { ProxyHandler } from './proxy-handler';
import * as proxy from 'http-proxy-middleware';
import * as express from 'express';
import { ConfigManager } from "../services/config-manager";

fdescribe('ProxyHandler', () => {
    it('should contain all required methods and properties', () => {
        const handler = new ProxyHandler;
        expect(handler.setup).toBeTruthy()
        expect(handler.getApp).toBeTruthy()
    });
    describe('getApp', () => {
        it('should return an express app', () => {
            const handler = new ProxyHandler;
            expect(typeof(handler.getApp())).toEqual(typeof( express()));
        });
    });
    describe('setup', () => {
        it('should get host array from host config', () => {
            const handler = new ProxyHandler;
            spyOn(ConfigManager, 'getHostConfig');
            handler.setup();
            expect(ConfigManager.getHostConfig).toHaveBeenCalled();
        });
        it('should initialize proxies defined in config', () => {
            const handler = new ProxyHandler;
            handler.setup();
            expect(typeof(handler.getApp())).toEqual(typeof( express()));
        });
    });
})