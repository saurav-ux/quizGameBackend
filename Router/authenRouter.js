import express from 'express'
const authRouter = express.Router();
import LoginCredential from '../Database/Schema/authenSchema.js';
import bcrypt from "bcryptjs";


//adding data
authRouter.post("/", async (req, res) => {
    try {
      const addingData = new LoginCredential(req.body);
      const email = req.body.email;
      const useremail = await LoginCredential.findOne({ email: email });
      if (useremail !== null ) {
        res.status(400).send("Email Already Exists");
      }
      else if( req.body.name===undefined){
        res.status(400).send("Please Fill Name");   
      }
       else {
        await addingData.save();
        res.status(200).send(true);
      }
      // res.status(201).send(true)
    } catch (error) {
      res.status(500).send("Internal Server Errors: ", error);
    }
  });


//get login credential
authRouter.get('/',async(req,res)=>{
    try {
        res.status(200).send(await LoginCredential.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Errors: ", error);
    }
})

//validate
authRouter.post("/validate", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const useremail = await LoginCredential.findOne({ email: email });
  
      if (useremail !== null) {
        const isMatch = await bcrypt.compare(password, useremail.password);
        if (isMatch) {
          res
            .status(201)
            .send({ status: true, name: useremail.name });
        } else {
          res
            .status(401)
            .send({ status: false, name: "Incorrect email or password" });
        }
      } else {
        res
          .status(401)
          .send({ status: false, name: "Incorrect email or password" });
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  export default authRouter