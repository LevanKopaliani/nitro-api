//https://nitro.unjs.io/config
export default defineNitroConfig({
  experimental: {
    database: true,
  },

  srcDir: "server",
  routeRules: {
    "/api/auth/**": {
      cors: true,
      headers: { "access-control-allow-methods": "GET" },
    },
  },

  runtimeConfig: {
    JWT_TOKEN: "test token",
    ant_token: "test token 123",
  },
  storage: {},
  database: {
    default: {
      connector: "sqlite",
      options: { name: "db" },
    },
    // users: {
    //   connector: "postgresql",
    //   url: "postgresql://username:password@hostname:port/database_name",
    // },
  },

  compatibilityDate: "2025-02-12",
});
