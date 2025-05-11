import { users, datasets, datasetColumns, type User, type InsertUser, type Dataset, type InsertDataset, type DatasetColumn, type InsertDatasetColumn } from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

// Update interface with all the CRUD methods needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dataset methods
  getAllDatasets(): Promise<Dataset[]>;
  getDataset(id: number): Promise<Dataset | undefined>;
  createDataset(dataset: InsertDataset): Promise<Dataset>;
  updateDataset(id: number, dataset: Partial<InsertDataset>): Promise<Dataset | undefined>;
  deleteDataset(id: number): Promise<boolean>;
  toggleFavorite(id: number): Promise<Dataset | undefined>;
  
  // Dataset column methods
  getDatasetColumns(datasetId: number): Promise<DatasetColumn[]>;
  createDatasetColumn(column: InsertDatasetColumn): Promise<DatasetColumn>;
  updateDatasetColumn(id: number, column: Partial<InsertDatasetColumn>): Promise<DatasetColumn | undefined>;
  deleteDatasetColumn(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Dataset methods
  async getAllDatasets(): Promise<Dataset[]> {
    return await db.select().from(datasets).orderBy(desc(datasets.updatedAt));
  }
  
  async getDataset(id: number): Promise<Dataset | undefined> {
    const [dataset] = await db.select().from(datasets).where(eq(datasets.id, id));
    return dataset;
  }
  
  async createDataset(dataset: InsertDataset): Promise<Dataset> {
    const [newDataset] = await db.insert(datasets).values(dataset).returning();
    return newDataset;
  }
  
  async updateDataset(id: number, dataset: Partial<InsertDataset>): Promise<Dataset | undefined> {
    const [updatedDataset] = await db
      .update(datasets)
      .set({ ...dataset, updatedAt: new Date() })
      .where(eq(datasets.id, id))
      .returning();
    return updatedDataset;
  }
  
  async deleteDataset(id: number): Promise<boolean> {
    await db.delete(datasets).where(eq(datasets.id, id));
    return true; // If we got here, it succeeded (would throw otherwise)
  }
  
  async toggleFavorite(id: number): Promise<Dataset | undefined> {
    const [dataset] = await db.select().from(datasets).where(eq(datasets.id, id));
    
    if (!dataset) {
      return undefined;
    }
    
    const [updatedDataset] = await db
      .update(datasets)
      .set({ 
        isFavorite: !dataset.isFavorite,
        updatedAt: new Date()
      })
      .where(eq(datasets.id, id))
      .returning();
      
    return updatedDataset;
  }
  
  // Dataset column methods
  async getDatasetColumns(datasetId: number): Promise<DatasetColumn[]> {
    return await db
      .select()
      .from(datasetColumns)
      .where(eq(datasetColumns.datasetId, datasetId))
      .orderBy(asc(datasetColumns.position));
  }
  
  async createDatasetColumn(column: InsertDatasetColumn): Promise<DatasetColumn> {
    const [newColumn] = await db.insert(datasetColumns).values(column).returning();
    return newColumn;
  }
  
  async updateDatasetColumn(id: number, column: Partial<InsertDatasetColumn>): Promise<DatasetColumn | undefined> {
    const [updatedColumn] = await db
      .update(datasetColumns)
      .set(column)
      .where(eq(datasetColumns.id, id))
      .returning();
    return updatedColumn;
  }
  
  async deleteDatasetColumn(id: number): Promise<boolean> {
    await db.delete(datasetColumns).where(eq(datasetColumns.id, id));
    return true; // If we got here, it succeeded (would throw otherwise)
  }
}

// Initialize the storage interface with database implementation
export const storage = new DatabaseStorage();
