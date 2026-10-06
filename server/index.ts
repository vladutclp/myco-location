import app from "./src/server.ts";
import env from "./env.ts";

app.listen(env.PORT, () => {
  console.log("server starting at port ", env.PORT);
});
