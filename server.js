const express = require("express");

const { resolveAlias } = require("./controllers/resolveAlias");
const { addAlias } = require("./controllers/addAlias")
const { ping } = require("./controllers/ping");
const { notFound } = require("./middleWares/notFound");
const { urlLogger } = require("./middleWares/urlLogger");
const { errorHandler } = require("./middleWares/errorHandler");
const { accessLogs } = require("./middleWares/accessLogs");
const { dumpDatabase } = require("./utils/dumpDatabase");
const { monitorProcess } = require("./utils/monitorProcess");
const { secure } = require("./middleWares/security");

const app = express();

secure(app);

app.use(express.json()); // to parse request.body
app.use(accessLogs()); // Запишем лог в консоль
app.use(accessLogs(true)); // Запишем лог в файл
app.use(urlLogger);

app.get("/ping", ping);
app.get("/:alias", resolveAlias);
app.post("/alias", addAlias);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

dumpDatabase();
monitorProcess();
