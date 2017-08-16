import { PROXIES_HOST_CONFIG_SCHEMA } from "./proxies-host-config.schema";

export const PROXIES_CONFIG_SCHEMA = {
  id: "/properties/proxies",
  items: PROXIES_HOST_CONFIG_SCHEMA,
  type: "array"
};
