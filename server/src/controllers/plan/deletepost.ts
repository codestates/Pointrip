import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";



const deletePlan = async (req: Request, res: Response) => {
    console.log("deletePlan도입")
    try {
        const postId =req.params
        console.log(postId.postId)
        if(!postId.postId){
            res.status(400).send({"message": "no postId"})
        }else{
        const post = await getRepo(Plan).createQueryBuilder().delete().where({
            id : postId.postId
        }).execute().then(()=>{
            res.status(200).send({"message" : "success" })
        }) 

        
        
    }
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }


   
}


export default deletePlan;