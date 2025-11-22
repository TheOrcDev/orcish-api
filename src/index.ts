import { Hono } from "hono";
import itemsApp from "./items.js";
import usersApp from "./users.js";

const app = new Hono();

app.get("/", (c) => c.redirect("https://docs.orcish-api.com"));

// Root route
app.get("/api", (c) =>
  c.json({
    message: "Orcish API",
    endpoints: {
      users: "/api/users",
      items: "/api/items",
    },
  })
);

// Mount routes
app.route("/api/users", usersApp);
app.route("/api/items", itemsApp);

export default app;
