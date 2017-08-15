import * as express from 'express';

export interface IHandlerFactory{
    createHandler(host):void;
    getApp(host):express.Express;
    setup();
}