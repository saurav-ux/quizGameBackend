import express from 'express'
const scoringRouter = express.Router();
import AnsData from '../Database/Schema/ansSchema.js';
import LeaderData from '../Database/Schema/leaderBSchema.js';




scoringRouter.post('/',async(req,res)=>{
//    console.log(req.body)
   let j=req.body.part,count=0;
//    console.log("j",j)
 const data = await AnsData.find({})
//   console.log(data[0]?.ans)
    try {
        for(let i=0;i<5;i++){
            if(data[j-1]?.ans[i]===req.body.ans[i]){
                if(req.body.marks==1){
                    count++;
                }
                else if(req.body.marks==2){
                    count=count+2;
                }
                else if(req.body.marks==3){
                    count=count+3;
                }
                else if(req.body.marks==4){
                    count=count+4;
                }
                else if(req.body.marks==5){
                    count=count+5;
                }
             
               
            }
        }
        const param = {name:req.body.name,score:count}
        const addingData = new LeaderData(param);
        await addingData.save();
         res.status(200).send({ans:count})
    } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
    }
})

scoringRouter.get('/leader',async(req,res)=>{
    try {
        // Find all data
        const data = await LeaderData.find({});
    
        // Sort data based on the highest score first
        const sortedData = data.sort((a, b) => b.score - a.score);
    
        res.status(200).send(sortedData);
      } catch (error) {
        res.status(500).send("Internal Server Error Leader: " + error);
      }
})

export default scoringRouter

