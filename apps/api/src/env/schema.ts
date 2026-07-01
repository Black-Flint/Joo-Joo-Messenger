import * as z from "zod";

export const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DATABASE_URL: z.url(),
	ORIGIN: z.string().default("http://localhost:3000"),
	PORT: z.coerce.number().int().positive().default(4000),
});

export type EnvSchema = z.infer<typeof envSchema>;
