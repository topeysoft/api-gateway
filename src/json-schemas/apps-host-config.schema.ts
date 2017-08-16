import { APPS_TARGET_CONFIG_SCHEMA } from './apps-target-config.schema';
import { ORIGINS_CONFIG_SCHEMA } from "./origins-config.schema";

export const APPS_HOST_CONFIG_SCHEMA = {
      id: "/properties/apps/host",
      
      type: "object",
      required: ["origins", "target"],
      properties: {
        origins: ORIGINS_CONFIG_SCHEMA,
        target: APPS_TARGET_CONFIG_SCHEMA
      }
  }
