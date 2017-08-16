import { PROXIES_TARGET_CONFIG_SCHEMA } from "./proxies-target-config.schema";
import { ORIGINS_CONFIG_SCHEMA } from "./origins-config.schema";

export const PROXIES_HOST_CONFIG_SCHEMA = {
  id: "/properties/proxies/host",

  required: ["origins", "target","options"],
  type: "object",
  properties: {
    origins: ORIGINS_CONFIG_SCHEMA,
    policies: {
      id: "/properties/proxies/items/properties/policies",
      items: {
        id: "/properties/proxies/items/properties/policies/items",
        properties: {
          name: {
            id:
              "/properties/proxies/items/properties/policies/items/properties/name",
            type: "string"
          }
        },
        type: "object"
      },
      type: "array"
    },
    target: PROXIES_TARGET_CONFIG_SCHEMA,
    options: {
      id: "/properties/proxies/items/properties/options",
      type: "object",
      default: {
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
      }
    }
  }
};
