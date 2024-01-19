import express from "express";
import cors from "cors";
import './Database/connection.js'
import quesRouter from "./Router/quesRouter.js";
import ansRouter from "./Router/ansRouter.js";
import scoringRouter from "./Router/scoringRouter.js";
import authRouter from "./Router/authenRouter.js";
const PORT = process.env.PORT || 5077;
const app = express();

// const PORT = 5077;
app.use(express.json());
app.use(cors());
app.use(cors({
  origin:['http://localhost:5077'],
  methods:['POST','GET','DELETE','PUT'],
  credentials:true
}))
app.get("/", (req, res) => {
  res.send("Welcome to Saurav Quiz");
});

app.use('/ques',quesRouter)
app.use('/ans',ansRouter)
app.use('/score',scoringRouter)
app.use('/auth',authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
