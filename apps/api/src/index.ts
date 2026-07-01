import { Elysia } from "elysia";
import { env } from "./env";
import { corsConfig as cors } from "./plugins/cors";
import { logger } from "./plugins/logger";

const _app = new Elysia({ name: "joo-joo-api" })
  .onError(({ code, error, set }) => {
    if (env.NODE_ENV === "development") {
      return {
        code,
        message: error,
      };
    }

    set.status = 500;

    return {
      code,
      message: "Internal Server Error",
    };
  })
  .use(cors)
  .use(logger("api"))
  .get("/health", {
    status: 200,
    uptime: process.uptime(),
  })
  .listen(env.PORT);
