import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import 'dotenv/config';
import {AppDataSource} from "./data-source";
import UserRouter from "./routes/user";
import PlanRouter from "./routes/plan";
import BookRouter from "./routes/bookmark";
import indexRouter from './routes'
import oauthRouter from './routes/oauth';
import Post from "./entity/post";
import cookieParser from "cookie-parser";

let server;
let PORT = process.env.SERVER_PORT || 4000;
function getRepo (entity: any) {
  return AppDataSource.getRepository(entity);
}
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        const app = express();
        app.use(
          cors({
            origin: ['http://localhost:3000'],
            credentials: true,
            methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE']
          })
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use("/users",UserRouter);
        app.use("/Oauth", oauthRouter);
        app.use("/plan",PlanRouter);
        app.use("/bookmark",BookRouter);
        server = app.listen(PORT, () => {
          console.log(`http server runnning on port ${PORT}.`)
        });
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

//routers

//routes
//-------------------- test--------------------------
/* app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello, world!");
}); */
//-------------------- test--------------------------

/* app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  });
}); */

// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('https server runnning'));
// } else {
  
// }
export { server, getRepo };