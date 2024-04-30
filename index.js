import { createServer } from "http";
import router from "./app/router.js";
import logger from "node-color-log";
const PORT = 3000;
createServer(router).listen(PORT, () => {
    logger.color("green").bold().log(`Server is running on http://localhost:${PORT}`);
});
