import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { describe, expect, it, test } from "vitest";

describe("trailing slash middleware is not handling HEAD request", () => {
  const app = new Hono();

  app.use(trimTrailingSlash());

  app.get("/", (c) => {
    c.header("X-Hello", "World");
    return c.text("Hello Hono!");
  });
  app.get("/foo", (c) => {
    c.header("X-Foo", "Bar");
    return c.text("Hello Foo!");
  });

  test("Prerequisite: Hono's get handler implicitly handles HEAD request", async () => {
    const res = await app.request("http://localhost:3000/", {
      method: "HEAD",
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Hello")).toBe("World");
  });

  test("This server should trim trailingSlash when GET request", async () => {
    const res = await app.request("http://localhost:3000/foo/");
    const location = res.headers.get("location")!;

    expect(res.status).toBe(301);
    expect(location).toBe("http://localhost:3000/foo");

    const actualRes = await app.request(location);
    expect(actualRes.status).toBe(200);
    expect(actualRes.headers.get("X-Foo")).toBe("Bar");
    expect(await actualRes.text()).toBe("Hello Foo!");
  });

  test("Considering the premise, This server should treat HEAD requests the same as GET requests", async () => {
    const res = await app.request("http://localhost:3000/foo/", {
      method: "HEAD",
    });
    const location = res.headers.get("location")!;

    expect(res.status).toBe(301);
    expect(location).toBe("http://localhost:3000/foo");

    const actualRes = await app.request(location, {
      method: "HEAD",
    });
    expect(actualRes.status).toBe(200);
    expect(actualRes.headers.get("X-Foo")).toBe("Bar");
  });
});
