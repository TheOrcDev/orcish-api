import { eq } from "drizzle-orm";
import { Hono } from "hono";
import db from "./db/drizzle.js";
import { type InsertItem, items } from "./db/schema.js";

const itemsApp = new Hono();

// GET all items
itemsApp.get("/", async (c) => {
  try {
    const allItems = await db.select().from(items);
    return c.json(allItems);
  } catch {
    return c.json({ error: "Failed to fetch items" }, 500);
  }
});

// GET item by id
itemsApp.get("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const result = await db.select().from(items).where(eq(items.id, id));

    if (result.length === 0) {
      return c.json({ error: "Item not found" }, 404);
    }

    return c.json(result[0]);
  } catch {
    return c.json({ error: "Failed to fetch item" }, 500);
  }
});

// POST create item
itemsApp.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { name, type, description, value } = body;

    if (!(name && type && description) || value === undefined) {
      return c.json(
        { error: "Name, type, description, and value are required" },
        400
      );
    }

    const newItem = await db
      .insert(items)
      .values({ name, type, description, value })
      .returning();
    return c.json(newItem[0], 201);
  } catch {
    return c.json({ error: "Failed to create item" }, 500);
  }
});

// PUT update item
itemsApp.put("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const body = await c.req.json();
    const { name, type, description, value } = body;

    const updateData: Partial<InsertItem> = {};

    if (name) {
      updateData.name = name;
    }
    if (type) {
      updateData.type = type;
    }
    if (description) {
      updateData.description = description;
    }
    if (value !== undefined) {
      updateData.value = value;
    }

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }

    const result = await db
      .update(items)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(items.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ error: "Item not found" }, 404);
    }

    return c.json(result[0]);
  } catch {
    return c.json({ error: "Failed to update item" }, 500);
  }
});

// DELETE item
itemsApp.delete("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const result = await db.delete(items).where(eq(items.id, id)).returning();

    if (result.length === 0) {
      return c.json({ error: "Item not found" }, 404);
    }

    return c.json({ message: "Item deleted", item: result[0] });
  } catch {
    return c.json({ error: "Failed to delete item" }, 500);
  }
});

export default itemsApp;
