import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  value: integer("value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  githubRepoUrl: text("github_repo_url").unique().notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resetDate: timestamp("reset_date"),
  deletedAt: timestamp("deleted_at"),
});

export const reviewedProjects = pgTable("reviewed_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  githubRepoUrl: text("github_repo_url").notNull(),
  description: text("description").notNull(),
  batch: integer("batch").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const previouslySubmittedProjects = pgTable(
  "previously_submitted_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    githubRepoUrl: text("github_repo_url").unique().notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type SelectProject = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export type SelectReviewedProject = typeof reviewedProjects.$inferSelect;
export type InsertReviewedProject = typeof reviewedProjects.$inferInsert;

export type SelectPreviouslySubmittedProject =
  typeof previouslySubmittedProjects.$inferSelect;
export type InsertPreviouslySubmittedProject =
  typeof previouslySubmittedProjects.$inferInsert;

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectItem = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

export const schema = {
  users,
  items,
  projects,
  reviewedProjects,
  previouslySubmittedProjects,
};
