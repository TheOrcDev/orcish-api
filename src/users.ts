import { eq } from "drizzle-orm";
import { Hono } from "hono";
import db from "./db/drizzle.js";
import { type InsertUser, users } from "./db/schema.js";

const usersApp = new Hono();

// GET all users
usersApp.get("/", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  } catch {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

// GET user by id
usersApp.get("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const result = await db.select().from(users).where(eq(users.id, id));

    if (result.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(result[0]);
  } catch {
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

// POST create user
usersApp.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email } = body;

    if (!(name && email)) {
      return c.json({ error: "Name and email are required" }, 400);
    }

    const newUser = await db.insert(users).values({ name, email }).returning();
    return c.json(newUser[0], 201);
  } catch {
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// PUT update user
usersApp.put("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const body = await c.req.json();
    const { name, email } = body;

    const updateData: Partial<InsertUser> = {};
    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }

    const result = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(result[0]);
  } catch {
    return c.json({ error: "Failed to update user" }, 500);
  }
});

// DELETE user
usersApp.delete("/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"), 10);
    const result = await db.delete(users).where(eq(users.id, id)).returning();

    if (result.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ message: "User deleted", user: result[0] });
  } catch {
    return c.json({ error: "Failed to delete user" }, 500);
  }
});

export default usersApp;
