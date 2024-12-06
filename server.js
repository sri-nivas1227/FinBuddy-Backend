import app from "./app.js";
import db from "./db.js";
// import cors from "cors";
import ServerlessHttp from "serverless-http";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  db();
  console.log(`Server listening on port ${PORT}`);
});
const serverlessHandler = ServerlessHttp(app);
export default serverlessHandler;
