import { pgTable } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const users = pgTable("users", (t) => ({
  id: t
    .uuid("id")
    .$defaultFn(() => uuidv7())
    .primaryKey(),

  username: t
    .varchar("username", {
      length: 30,
    })
    .notNull()
    .unique(),

  password: t.text("password").notNull(),

  bio: t.varchar("bio", {
    length: 160,
  }),

  createdAt: t.timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  }),

  updatedAt: t
    .timestamp("updated_at", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}));
