import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";

const app = new Hono();
app.use(trimTrailingSlash());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/foo", (c) => {
  return c.text("Hello Foo!");
});

export default app;
