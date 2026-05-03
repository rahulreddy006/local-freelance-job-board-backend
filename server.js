import 'dotenv/config';
import app from "./app.js"
import userRoute from "./src/routes/auth.routes.js"
import { connectDB } from "./src/config/db.config.js";

connectDB();


app.use("/api/v1",userRoute)

app.get("/",(req,res)=>{
   res.send("Server is Working")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server runing on port: ${PORT}`)
});


