import { cors } from "@elysia/cors";
import { options } from "../config/cors";

export const corsConfig = cors(options);
