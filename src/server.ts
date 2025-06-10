import express from "express";
import bodyParser from "body-parser";
import { users } from "./router/users";
import { auth } from "./router/auth";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/users", users);
app.use("/auth", auth);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
