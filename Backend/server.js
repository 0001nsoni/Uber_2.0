import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
import { initializeSocket } from "./socket.js"; // <-- import

dotenv.config({
    path: './env'
});

connectDB()
.then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port:${process.env.PORT}`);
    });
    initializeSocket(server); // <-- initialize socket.io with the HTTP server
})
.catch((err) => {
    console.log("Mongo db connection failed!!!", err);
});