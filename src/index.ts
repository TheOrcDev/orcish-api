import { Hono } from "hono";
import itemsApp from "./items.js";
import projectsApp from "./projects.js";
import usersApp from "./users.js";

const app = new Hono();

// Root route
app.get("/api", (c) =>
  c.json({
    message: "Orcish API",
    endpoints: {
      users: "/api/users",
      items: "/api/items",
      projects: "/api/projects",
    },
  })
);

// Mount routes
app.route("/api/users", usersApp);
app.route("/api/items", itemsApp);
app.route("/api/projects", projectsApp);

app.get("/", (c) => c.redirect("https://docs.orcish-api.com"));

export default app;
