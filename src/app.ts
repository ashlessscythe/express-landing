import express, { Express, Request, Response } from "express";
import path from "path"; // Use ES6 import for path module
import dotenv from "dotenv"; // Import dotenv as an ES6 module
import bodyParser from "body-parser"; // Import body-parser as an ES6 module

dotenv.config(); // Load environment variables

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3000", 10); // Ensure PORT is a number

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../templates")));
app.use(bodyParser.urlencoded({ extended: true })); // use body-parser to parse form data

app.get("/", (req: Request, res: Response) => {
  res.render("welcome");
});

app.post("/submit", (req: Request, res: Response) => {
  const { eventName, hostName } = req.body;
  res.render("index", { eventName, hostName });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
