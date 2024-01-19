import express from 'express'
const ansRouter = express.Router()
import AnsData from '../Database/Schema/ansSchema.js'

//post
ansRouter.post('/',async (req,res)=>{
    try {
      const addData = new AnsData(req.body)
      if(req.body.ans==""){
          res.status(500).send("Please fill input")
      }
      else{
          await addData.save()
          res.status(200).send(true)
      }
     
    } catch (error) {
      res.status(500).send("Internal Server Errors: ",error)
    }
  })

//get
 ansRouter.get('/',async(req,res)=>{
    try {
        res.status(200).send(await AnsData.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
    }
})

export default ansRouter

