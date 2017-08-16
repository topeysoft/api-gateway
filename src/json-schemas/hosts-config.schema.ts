import { PROXIES_CONFIG_SCHEMA } from './proxies-config.schema';
import { APPS_CONFIG_SCHEMA } from "./apps-config.schema";

export const HOSTS_CONFIG_SCHEMA = {
//  $schema: "http://json-schema.org/draft-04/schema",
  definitions: {},
  id: "HostsConfig",
  
  message: "Host config is invalid",
  required:['proxies', 'apps'],
  type:'object',
  properties: {
    apps: APPS_CONFIG_SCHEMA,
    proxies: PROXIES_CONFIG_SCHEMA
  }
};
