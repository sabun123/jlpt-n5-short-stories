import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
  ui: {
    primary: "green",
    notifications: {
      position: "top-right",
    },
    icons: {
      dynamic: true,
    },
  },
});
