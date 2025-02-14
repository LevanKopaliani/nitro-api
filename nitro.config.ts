//https://nitro.unjs.io/config
export default defineNitroConfig({
  experimental: {
    database: true,
  },
  srcDir: "server",
  runtimeConfig: {
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
