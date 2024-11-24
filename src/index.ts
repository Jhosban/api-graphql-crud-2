import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";

// Funcion principal de la aplicacion
async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log("listening on port",PORT);
  } catch (err) {
    console.log(err);
  }
}

main();
