import * as express from 'express';
import { ConfigManager } from "../../services/config-manager";

export class MainHandler{
    private _app;
    setup(){
        this._app = express();
        const config = ConfigManager.getHostConfig();
    }
    getApp(){

    }
    /**
     *
     */
    constructor() {
        this.setup();
    }
}