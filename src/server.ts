import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { users } from "./router/users";
import { auth } from "./router/auth";
import cors from "cors";

const app = express();
const PORT = 3001;

const corsOptions = {
	origin: ["http://localhost:8081","http://localhost:3002"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	optionsSuccessStatus: 200,
};

// app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", users);
app.use("/auth", auth);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
