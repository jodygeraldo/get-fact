import { Router, send, Status } from "./deps.ts";
import { getFact, removeFact, setFact } from "./controllers/fact.ts";

const router = new Router();

router.get("/", async ({ response }) => {
  const html = await Deno.readFile("./public/index.html");
  response.body = html;
  response.headers.set("content-type", "text/html");
  response.status = Status.OK;
});

router.get("/public/:path+", async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}`,
  });
});

router.get("/api/v1/fact", async ({ request, response }) => {
  await getFact(request, response);
});

router.post("/api/v1/fact", async ({ request, response }) => {
  await setFact(request, response);
});

router.delete("/api/v1/fact", async ({ request, response }) => {
  await removeFact(request, response);
});

export { router };
