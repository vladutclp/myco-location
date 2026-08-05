import app, { PORT } from "./src/server.ts";

app.listen(PORT, () => {
  console.log("server starting at port ", PORT);
});
