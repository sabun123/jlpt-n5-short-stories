import { defineAppConfig } from "#imports";

export default defineAppConfig({
  ui: {
    primary: "green",
    secondary: "blue",
    gray: "neutral",
    neutral: "slate",
    accent: "rose",
    info: "sky",
    success: "green",
    warning: "yellow",
    danger: "red",
    error: "red",
    notifications: {
      position: "top-right",
    },
    icons: {
      dynamic: true,
    },
  },
});
