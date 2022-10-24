// src/server/router/_app.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { helpRequestRouter } from "./helpRequest";

export const appRouter = router({
  example: exampleRouter,
  helpRequest: helpRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
