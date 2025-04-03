
# trailingSlash middleware in Hono is not handling HEAD request

In Hono, the GET handler implicitly handles HEAD requests as well.

However, since the trailingSlash middleware only handles GET requests,
there is a difference in behavior between the GET and HEAD methods when accessing the same endpoint.

You can check example at `src/index.test.ts` file.
