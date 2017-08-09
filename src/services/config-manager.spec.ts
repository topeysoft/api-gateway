import { ConfigManager } from "./config-manager";

describe('ConfigManager', () => {
    beforeEach(()=>{
        process.env.NODE_ENV = 'development';
    })
    it('should define all required methods', ()=>{
        expect(ConfigManager.get).toBeTruthy()
        expect(ConfigManager.getConfig).toBeTruthy()
        expect(ConfigManager.setConfigPaths).toBeTruthy()
        expect(ConfigManager.reloadConfig).toBeTruthy()
    });
    describe('Get', ()=>{
        it('should call getConfig', ()=>{
            spyOn(ConfigManager, 'getConfig');
            ConfigManager.get("");
            expect(ConfigManager.getConfig).toHaveBeenCalled();
        });
        it('should return specifig config item by key', ()=>{
            process.env.NODE_ENV = 'development';
            const config = ConfigManager.get('environment');
            expect(config).toEqual('development');
        });
        
    });
    describe('GetConfig', ()=>{
        it('should call setConfigPaths', ()=>{
            spyOn(ConfigManager, 'setConfigPaths');
            ConfigManager.getConfig();
            expect(ConfigManager.setConfigPaths).toHaveBeenCalled();
        });
        it('should return config for the right environment', ()=>{
            const dev_env ='development',
            prod_env ='production';
            process.env.NODE_ENV = dev_env;
            let config = ConfigManager.getConfig();
            expect(config.environment).toEqual(dev_env);

            ConfigManager.reloadConfig();
            process.env.NODE_ENV = prod_env;
            config = ConfigManager.getConfig();
            expect(config.environment).toEqual(prod_env);
        });
        
    })
    describe('SetConfigPaths', ()=>{
        it('should configure config paths', ()=>{
            const env ='development';
            process.env.NODE_ENV = env;
            ConfigManager.setConfigPaths();
            expect(ConfigManager.environment).toEqual(env);
            expect(ConfigManager.configFile).toEqual(`./config/${env}.json`);
            expect(ConfigManager.hostsFile).toEqual(`./config/${env}.hosts.json`);
        });
        
    })
    describe('ReloadConfig', ()=>{
        it('should reset config data', ()=>{
            ConfigManager.config = {test:true};
            ConfigManager.hostConfig = [{test:true}];
            ConfigManager.reloadConfig();
            expect(ConfigManager.config).toBeNull();;
            expect(ConfigManager.hostConfig).toBeNull();;
        });
    })
})