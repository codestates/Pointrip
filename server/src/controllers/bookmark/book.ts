import { Request, Response } from 'express';
import { QueryBuilder, QueryResult } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';


const addBook = async (req: Request, res: Response) => {


    console.log("addBook도입")
    try {
        const { postId, userId } = req.body
        console.log(postId, userId)
        if (!postId || !userId) {
            res.status(400).send({ 'message': 'input error' })
        }
        await getRepo(Saved).createQueryBuilder().select().where(
           
            {
                user : userId,
                post : postId
                 
            }
           
                
        
            
        ).execute()
        .then(async (data) => {
            console.log(data)
          
            if (data.length!==0) {
                res.status(422).send({ "message": "already existed" })
            } else {
                const addbook = await getRepo(Saved).createQueryBuilder().insert().values({ user: userId, post: postId }).execute();
                return res.status(200).send({ "message": "success" })
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}



export default addBook;