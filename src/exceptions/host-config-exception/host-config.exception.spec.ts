import { HostConfigException } from './host-config.exception';
import { BaseException } from "../base.exception";

describe('HostConfigExeption', ()=>{
    it('should extend BaseExeption', ()=>{
        expect(HostConfigException).toHaveExtended(BaseException);
    })
})