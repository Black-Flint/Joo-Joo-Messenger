import { pgTable } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";
import { users } from "./users.schema";

export const sessions = pgTable("sessions", (t) => ({
  id: t
    .uuid("id")
    .$defaultFn(() => uuidv7())
    .primaryKey(),

  userid: t
    .uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  refreshTokenHash: t.text("refresh_token_hash"),

  expiresAt: t
    .timestamp("expires_at", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
    .notNull(),

  revokedAt: t.timestamp("revoked_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  }),

  createdAt: t
    .timestamp("created_at", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
    .defaultNow()
    .notNull(),
}));
