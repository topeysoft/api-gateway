import { MainHandler } from "./main-handler";
import { ConfigManager } from "../../services/config-manager";

fdescribe('MainHandler', () => {
    beforeEach(()=>{
        process.env.NODE_ENV =  'development';
    })
    it('should implement all required methods', ()=>{
        const handler = new MainHandler;
        expect(handler.setup).toBeDefined();
        expect(handler.getApp).toBeDefined();
    });
    it('should perform setup when instatianted', ()=>{
        spyOn(MainHandler.prototype, 'setup');
        const handler = new MainHandler;
        expect(handler.setup).toHaveBeenCalled();
    });

    describe('Setup', ()=>{
        it('should setup express app', ()=>{
            const handler:any = new MainHandler;
            handler.setup();
            expect(handler._app).toBeDefined()
        });
        it('should get host config from config service', ()=>{
            const handler:any = new MainHandler;
            spyOn(ConfigManager, 'getHostConfig');
            handler.setup();
            expect(ConfigManager.getHostConfig).toHaveBeenCalled();
        });

        it('should setup all hosts with proxy type', ()=>{
            var ConfigManagerObject = jasmine.createSpyObj('ConfigManager', [ 'getHostConfig']);
                ConfigManagerObject.getHostConfig.and.callFake(() =>{
                    return ;
                });

        })
    })
    
    
    // it('should setup all hosts with app type', ()=>{
    //     throw 'Not implemented';

    // })
    // describe('GetApp', ()=>{
    //     it('should return express app', ()=>{
    //     throw 'Not implemented';

    //     })
    // });    
})