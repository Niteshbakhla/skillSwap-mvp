import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js"
import GlobalError from "./middlewares/globalError.js";
import morgan from 'morgan';
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// 4️⃣ Morgan logging (only in development)
if (config.NODE_ENV === 'development') {
            app.use(morgan('dev'));   // Logs every incoming HTTP request
}


app.use("/api", routes);
console.log(config.NODE_ENV)

// 404 Handler
app.use((req, res, next) => {
            next(new CustomError(`Route not found - ${req.originalUrl}`, 404));
});

app.use(GlobalError)


export default app;