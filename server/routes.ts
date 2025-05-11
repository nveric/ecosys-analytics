import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertDatasetSchema, insertDatasetColumnSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handler for routes
  const handleApiError = (res: Response, error: any) => {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // Dataset routes
  app.get("/api/datasets", async (req: Request, res: Response) => {
    try {
      const datasets = await storage.getAllDatasets();
      res.json(datasets);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/datasets/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dataset = await storage.getDataset(id);
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      res.json(dataset);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/datasets", async (req: Request, res: Response) => {
    try {
      const validation = insertDatasetSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Validation Error", 
          details: validation.error.errors 
        });
      }
      
      const dataset = await storage.createDataset(validation.data);
      res.status(201).json(dataset);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.patch("/api/datasets/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const existingDataset = await storage.getDataset(id);
      
      if (!existingDataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      // Validate only the fields that are provided
      const partialSchema = insertDatasetSchema.partial();
      const validation = partialSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Validation Error", 
          details: validation.error.errors 
        });
      }
      
      const updatedDataset = await storage.updateDataset(id, validation.data);
      res.json(updatedDataset);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.delete("/api/datasets/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const existingDataset = await storage.getDataset(id);
      
      if (!existingDataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      await storage.deleteDataset(id);
      res.status(204).send();
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/datasets/:id/favorite", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dataset = await storage.toggleFavorite(id);
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      res.json(dataset);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Dataset Column routes
  app.get("/api/datasets/:datasetId/columns", async (req: Request, res: Response) => {
    try {
      const datasetId = parseInt(req.params.datasetId);
      const dataset = await storage.getDataset(datasetId);
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      const columns = await storage.getDatasetColumns(datasetId);
      res.json(columns);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/datasets/:datasetId/columns", async (req: Request, res: Response) => {
    try {
      const datasetId = parseInt(req.params.datasetId);
      const dataset = await storage.getDataset(datasetId);
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      const validation = insertDatasetColumnSchema.safeParse({
        ...req.body,
        datasetId,
      });
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Validation Error", 
          details: validation.error.errors 
        });
      }
      
      const column = await storage.createDatasetColumn(validation.data);
      res.status(201).json(column);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.patch("/api/datasets/:datasetId/columns/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const datasetId = parseInt(req.params.datasetId);
      
      // Ensure the column belongs to the specified dataset
      const columns = await storage.getDatasetColumns(datasetId);
      const column = columns.find(col => col.id === id);
      
      if (!column) {
        return res.status(404).json({ error: "Column not found" });
      }
      
      // Validate only the fields that are provided
      const partialSchema = insertDatasetColumnSchema.partial();
      const validation = partialSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Validation Error", 
          details: validation.error.errors 
        });
      }
      
      const updatedColumn = await storage.updateDatasetColumn(id, validation.data);
      res.json(updatedColumn);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.delete("/api/datasets/:datasetId/columns/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const datasetId = parseInt(req.params.datasetId);
      
      // Ensure the column belongs to the specified dataset
      const columns = await storage.getDatasetColumns(datasetId);
      const column = columns.find(col => col.id === id);
      
      if (!column) {
        return res.status(404).json({ error: "Column not found" });
      }
      
      await storage.deleteDatasetColumn(id);
      res.status(204).send();
    } catch (error) {
      handleApiError(res, error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
