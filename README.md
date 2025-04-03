
# trailingSlash middleware in Hono is not handling HEAD requests

In Hono, the GET handler implicitly handles HEAD requests as well.

However, since the trailingSlash middleware only handles GET requests,
There is a difference in behavior between the GET and HEAD methods when accessing the same endpoint.

You can check the test cases explaining expected behavior at `src/index.test.ts` file.
You can also see the test results for this expected behavior in the GitHub Actions log.
