import { BaseException } from "../base.exception";

export class HostConfigException extends BaseException {
    constructor(message?) {
        super(message);
    }
}
