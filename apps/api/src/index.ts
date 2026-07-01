import { Elysia } from "elysia";
import { logger } from "./plugins/logger";

const app = new Elysia()
	.use(logger("api"))
	.get("/", () => "Hello World")
	.listen(4000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
