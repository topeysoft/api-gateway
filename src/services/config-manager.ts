
const fs = require('fs');
    

export class ConfigManager {
    
    static environment = process.env.NODE_ENV;
    static configFile = `./config/${ConfigManager.environment}.json`;
    static hostsFile = `./config/${ConfigManager.environment}.hosts.json`;

    static config;
    static hostConfig = [];

    static getConfig() {
        ConfigManager.setConfigPaths();
        if(!ConfigManager.config){
          ConfigManager.config = JSON.parse(fs.readFileSync(ConfigManager.configFile));
        }
        return ConfigManager.config;
    }
    static getHostConfig() {
        return ConfigManager.hostConfig;
    }
    static get(key:string) {
        const config = ConfigManager.getConfig() || {};
        return config[key];
    }

    static setConfigPaths(){
        ConfigManager.environment = process.env.NODE_ENV;
        ConfigManager.configFile = `./config/${ConfigManager.environment}.json`;
        ConfigManager.hostsFile = `./config/${ConfigManager.environment}.hosts.json`;
    }
    static reloadConfig(){
        ConfigManager.config = null;
        ConfigManager.hostConfig = null;
    }
}
