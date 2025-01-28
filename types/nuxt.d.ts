/// <reference types="nuxt" />

declare module "nuxt/schema" {
  interface NuxtConfig {
    ui?: {
      icons?: string[];
      global?: boolean;
    };
  }
}

// Extend runtime config
declare module "@nuxt/schema" {
  interface RuntimeConfig {
    ui?: {
      icons?: string[];
      global?: boolean;
    };
  }
}

declare function useNuxtApp(): NuxtApp;

// Extend runtime config types
declare module "nuxt/app" {
  interface NuxtApp {
    $toast: {
      add(options: {
        title: string;
        description?: string;
        color?: string;
        timeout?: number;
      }): void;
    };
  }
}

export {};
