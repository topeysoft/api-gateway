import * as express from 'express';

export class Server{
    private _app;
    static bootstrap(){
        return new Server();
    };

    getApp(){
        return this._app;
    }

    /**
     *
     */
    constructor() {
        this._app = express();
    }
}