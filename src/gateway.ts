import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";

export class ApiGateway{
    constructor() {
        this._app = express();
    }

    private _app: express.Express;

    private _setup(){
        this._app.use(express.static(path.join(__dirname, "public")));
        this._app.set("views", path.join(__dirname, "views"));
        this._app.set("view engine", "pug");
        this._app.use(logger("dev"));
        // this._app.use(bodyParser.json({ limit: this._requestSizeLimit }));
        // this._app.use(bodyParser.urlencoded({ limit: this.requestSizeLimit, extended: true }));
    }
    getApp(){
        return this._app;
    }
    static bootstrap() {
        return (new ApiGateway());
    }

}