export const ORIGINS_CONFIG_SCHEMA = {
  id: "/properties/proxies/items/properties/origins",
  type: "array",
  items: {
    id: "/properties/apps/items/properties/origins/items",
    required: ["hostname"],
    properties: {
      hostname: {
        id: "/properties/proxies/items/properties/origin/properties/hostname",
        type: "string",
        format: "hostname"
      },
      path: {
        id: "/properties/proxies/items/properties/origin/properties/path",
        type: "string",
        default:'/'
      }
    }
  }
};
