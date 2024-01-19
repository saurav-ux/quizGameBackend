import express from 'express'
const quesRouter = express.Router()
import QuesData from '../Database/Schema/quesSchema.js'

quesRouter.post('/',async (req,res)=>{
    try {
      const addData = new QuesData(req.body)
      if(req.body.questions=="" || req.body.options==""){
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

quesRouter.get('/',async(req,res)=>{
    try {
          
        let count = 0;

        // Calculate skip based on the part and items per page
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page

        const skip = (page - 1) * limit;
        const totalItems = await QuesData.countDocuments(await QuesData.find({}));
        const totalPages = Math.ceil(totalItems / limit);

        // Fetch only the required items for the specified part
        const data = await QuesData.find({}).skip(skip).limit(limit);
        const currentPage = Math.min(totalPages, page);

        res.status(200).send({
            data: data,
            totalPages,
            currentPage
        });
     //   res.status(200).send(await QuesData.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
    }
})
export default quesRouter;