import server from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
