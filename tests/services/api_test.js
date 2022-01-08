import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../../app.js";

Deno.test({
    name: "GET request to /api/questions/random address should return 200 response",
    async test_function() {
      const testClient = await superoak(app);
      await testClient.get("/api/questions/random").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
  