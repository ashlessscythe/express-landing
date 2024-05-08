import express, { Express, Request, Response } from "express";

import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
console.log("DB is: ", process.env.DATABASE_URL);

const app: Express = express();
const PORT = parseInt(process.env.PORT as string, 10) || 3000;

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

app.post("/save-signature", async (req, res) => {
  const { name, signature } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        signature: signature,
      },
    });
    res.json({ message: "Signature saved successfully!", user });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to save signature", error: error.toString() });
    } else {
      res.status(500).json({
        message: "Failed to save signature",
        error: "An unknown error occurred",
      });
    }
  }
});

// get all user signatures
app.get("/signatures", async (req: Request, res: Response) => {
  const signatures = await prisma.user.findMany({
    select: {
      name: true,
      signature: true,
    },
  });
  res.json(signatures);
});

app.get("/index", (req: Request, res: Response) => {
  const eventName = req.query.eventName ? req.query.eventName.toString() : "";
  const contactName = req.query.contactName
    ? req.query.contactName.toString()
    : "";
  res.render("index", { eventName, contactName });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
