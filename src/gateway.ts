import { MainHandler } from './handlers/main-handler/main-handler';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";
import { ConfigManager } from "./services/config-manager";

export class ApiGateway{
    logger = logger;
    constructor() {
        this._app = express();
        this._setup();
    }

    private _app: express.Express;

    private _setup(){
        this._app.use(express.static(path.join(__dirname, "public")));
        this._app.set("views", path.join(__dirname, "views"));
        this._app.set("view engine", "pug");
        this._app.use(this.logger("combined"));
        this._app.use(bodyParser.json({ limit: ConfigManager.get('requests').sizeLimit }));
        this._app.use(bodyParser.urlencoded({ limit: ConfigManager.get('requests').sizeLimit }));

        const mainHandler = new MainHandler;
       this._app.use(mainHandler.getApp());
    }
    getApp(){
        return this._app;
    }
    static bootstrap() {
        return (new ApiGateway());
    }

}