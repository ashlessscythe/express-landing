import express, { Express, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";

const app: Express = express();
const PORT: number = 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware to serve static files and parse request bodies
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("welcome");
});

app.post("/submit", (req: Request, res: Response) => {
  const { eventName, hostName } = req.body;
  res.redirect(
    `/index?eventName=${encodeURIComponent(
      eventName
    )}&hostName=${encodeURIComponent(hostName)}`
  );
});

app.get("/index", (req: Request, res: Response) => {
  const eventName = req.query.eventName ? req.query.eventName.toString() : "";
  const hostName = req.query.hostName ? req.query.hostName.toString() : "";
  res.render("index", { eventName, hostName });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
