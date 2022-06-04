import "reflect-metadata"
import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from 'cors';
import cookieparser from 'cookie-parser';
import bodyParser from "body-parser";
import 'dotenv/config';
import { AppDataSource } from "./data-source"
import UserRouter from "./routes/user";
import PlanRouter from "./routes/plan";
import BookRouter from "./routes/bookmark";
import indexRouter from './routes'
import oauthRouter from './routes/oauth';


export function getRepo (entity: any) {
  return AppDataSource.getRepository(entity);
}
export function insertIgnore (instance: any, entity: any) {
  return getRepo(entity).createQueryBuilder()
  .insert()
  .into(entity)
  .values(instance)
  .orIgnore()
  .execute();
}
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
     
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })


//routers
const corsOption = {
  origin: ['*'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS','PATCH','DELETE']
  };

const app = express();

//routes
//-------------------- test--------------------------
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello world");
});
//-------------------- test--------------------------
app.use("/users",UserRouter)
app.use("/Oauth", UserRouter)
app.use("/plan",PlanRouter)
app.use("/bookmark",BookRouter)






app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  });
});

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
console.log(HTTPS_PORT);
let server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('https server runnning'));
// } else {
  server = app.listen(HTTPS_PORT, () => {
    console.log('http server runnning')
  });
// }

export default app;