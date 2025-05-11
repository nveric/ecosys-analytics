import { pgTable, text, serial, integer, boolean, timestamp, json, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Dataset related schemas
export const dataSourceTypeEnum = pgEnum('data_source_type', ['database', 'csv', 'api']);

export const datasets = pgTable("datasets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sourceType: dataSourceTypeEnum("source_type").notNull().default('database'),
  sourceConfig: json("source_config").$type<{ [key: string]: any }>(),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  rowCount: integer("row_count"),
  isFavorite: boolean("is_favorite").default(false),
});

// Relations will be defined after all tables

export const datasetColumns = pgTable("dataset_columns", {
  id: serial("id").primaryKey(),
  datasetId: integer("dataset_id").notNull().references(() => datasets.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  displayName: text("display_name"),
  description: text("description"),
  dataType: text("data_type").notNull(),
  position: integer("position").notNull(),
  isVisible: boolean("is_visible").default(true),
});

// Relations will be defined below

export const insertDatasetSchema = createInsertSchema(datasets)
  .omit({ id: true, createdAt: true, updatedAt: true });

export const insertDatasetColumnSchema = createInsertSchema(datasetColumns)
  .omit({ id: true });

export type InsertDataset = z.infer<typeof insertDatasetSchema>;
export type Dataset = typeof datasets.$inferSelect;
export type InsertDatasetColumn = z.infer<typeof insertDatasetColumnSchema>;
export type DatasetColumn = typeof datasetColumns.$inferSelect;

// Now define all relations
export const userRelations = relations(users, ({ many }) => ({
  datasets: many(datasets),
}));

export const datasetRelations = relations(datasets, ({ one, many }) => ({
  creator: one(users, {
    fields: [datasets.createdBy],
    references: [users.id],
  }),
  columns: many(datasetColumns),
}));

export const datasetColumnRelations = relations(datasetColumns, ({ one }) => ({
  dataset: one(datasets, {
    fields: [datasetColumns.datasetId],
    references: [datasets.id],
  }),
}));
