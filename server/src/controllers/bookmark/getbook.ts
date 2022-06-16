import { Request, Response } from 'express';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';



const getBook = async (req :Request, res :Response) => {


    console.log("getBook도입")
   
    try {
        const {userId} = req.params
        console.log(userId)
       const ip = await getRepo(Saved).createQueryBuilder().select("postId").where(
        {
           
             user : userId 
        }).execute().then((data: any) => {
            const fpostId = data[0].postId
                console.log(fpostId)
           
            
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }


   
}



export default getBook;