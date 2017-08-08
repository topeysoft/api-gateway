const environment = process.env.NODE_ENV;
const fs = require('fs');
const configFile = `./config/${environment}.json`;
const hostsFile = `./config/${environment}.hosts.json`;


export class ConfigManager {

    private static config = JSON.parse(fs.readFileSync(configFile));
    private static hostConfig = JSON.parse(fs.readFileSync(hostsFile)) || [];

    static getConfig() {
        return ConfigManager.config;
    }
    static getHostConfig() {
        return ConfigManager.hostConfig;
    }
    static get() {

    }
}
