import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./server";

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  server.resetHandlers();
  sessionStorage.clear();
});
