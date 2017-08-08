import { ConfigManager } from "./config-manager";

fdescribe('ConfigManager', () => {
    it('should define all required methods', ()=>{
        expect(ConfigManager.get).toBeTruthy()
        expect(ConfigManager.getConfig).toBeTruthy()
    });
    describe('_GetConfig', ()=>{
        it('should return dev config', ()=>{
            process.env.NODE_ENV = 'development';
        });
        
    })
})