import app from "./app.js";
import db from "./db.js";
// import cors from "cors";
import serverless from "serverless-http";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  db();
  console.log(`Server listening on port ${PORT}`);
});

export const handler = serverless(app);
