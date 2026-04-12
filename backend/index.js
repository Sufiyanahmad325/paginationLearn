import { configDotenv } from "dotenv";
import app from "./app.js";
import connectionDB from "./DB/connectionToDB.js";

configDotenv({path:'./env'})

const PORT = process.env.PORT || 8000

connectionDB().then(async()=>{

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
})

