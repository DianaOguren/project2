import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../../app.js";

Deno.test({
  name: "GET request to / address should return 200 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});


Deno.test({
  name: "GET request to /auth/register address should return 200 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/auth/register").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /auth/login address should return 200 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/auth/login").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /quiz address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/quiz").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /questions address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/questions").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /statistics address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/statistics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /quiz/1 address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/quiz/1").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "GET request to /questions/1 address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/questions/1").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});



Deno.test({
  name: "GET request to /quiz/1/correct address should return 302 response",
  async test_function() {
    const testClient = await superoak(app);
    await testClient.get("/quiz/1/correct").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});