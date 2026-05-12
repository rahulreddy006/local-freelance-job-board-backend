import "dotenv/config";
import app from "./app.js";
import userRoute from "./src/routes/auth.route.js";
import gigRoute from "./src/routes/gig.route.js";
import applicationRoute from "./src/routes/application.route.js";
import { connectDB } from "./src/config/db.config.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import  {swaggerDocument} from "./src/config/swagger.config.js";

connectDB();

app.use("/api/v1", userRoute);
app.use("/api/v1", gigRoute);
app.use("/api/v1", applicationRoute);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Server is Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server runing on port: ${PORT}`);
});
