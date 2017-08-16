export const APPS_TARGET_CONFIG_SCHEMA = {
  id: "/properties/apps/items/properties/target",
  type: "object",
  required:["path"],
  properties: {
    path: {
      id: "/properties/apps/items/properties/target/properties/path",
      type: "string"
    }
  },
};
