export const PROXIES_TARGET_CONFIG_SCHEMA = {
  id: "/properties/proxies/items/properties/target",
  type: "object",
  required:["url"],
  properties: {
    url: {
      id: "/properties/proxies/items/properties/target/properties/url",
      type: "string",
      format:'uri'
    }
  },
};
