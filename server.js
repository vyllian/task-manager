
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const { create, router } = jsonServer;

const app = create();
const dbRouter = router(path.join(dirname, "db.json"));

app.use(cors());
app.db = dbRouter.db;
app.use(auth);
const rules = auth.rewriter({
  tasks: 660 //доступ лише власнику  
});
app.use(rules);
app.use(dbRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`JSON Server з авторизацією запущено на http://localhost:${PORT}`);
});