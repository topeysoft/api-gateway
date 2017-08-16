import { HOSTS_CONFIG_SCHEMA } from "./../../json-schemas/hosts-config.schema";
import { HostConfigException } from "../../exceptions/index";
import * as Ajv from "ajv";

export class ConfigValidator {
  static validate(configJson, schema?, useDefaults?) {
    if (useDefaults === undefined) {
      useDefaults = true;
    }
    schema = schema || HOSTS_CONFIG_SCHEMA;
    const ajv = new Ajv({ messages: true, useDefaults: useDefaults });
    if (!ajv.validate(schema, configJson)) {
      // console.log(ajv.errors)
      HostConfigException.throw(`Invalid host config: ${ajv.errors}`);
    }
  }
}
