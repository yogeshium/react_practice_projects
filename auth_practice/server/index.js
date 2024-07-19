import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//ROUTES IMPORT
import authRouter from "./routes/auth.js";

//MIDDLEWARES import
import isAuthenticated from "./middlewares/isAuthenticated.js";

const app = express();
const PORT = 8000;

//MIDDLEWARES//
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES//
app.get("/", isAuthenticated, (req, res) => {
  if (req.user) return res.status(200).json({ success: true, user: req.user });
  return res.status(200).json({ success: false });
});

//Login and Signup and refresh
app.use("/", authRouter);

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
