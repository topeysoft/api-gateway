import { APPS_HOST_CONFIG_SCHEMA } from "./apps-host-config.schema";

export const APPS_CONFIG_SCHEMA = {
  id: "/properties/proxies",
  items: APPS_HOST_CONFIG_SCHEMA,
  type: "array"
};
