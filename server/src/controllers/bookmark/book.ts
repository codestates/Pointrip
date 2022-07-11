import { Request, Response } from 'express';
import { QueryBuilder, QueryResult } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';
import token from '../token-functions';


const addBook = async (req: Request, res: Response) => {


    console.log("addBook도입")
    try {
        const accessTokenData: any = await token.isAuthorized(req);
        const { postId} = req.body
        const userId = accessTokenData.id
        console.log(postId)


        if (!accessTokenData) {
            console.log('토큰값이 없습니다.');
            return res.status(401)
                .send('토큰값이 없습니다.');
        }
        if (!postId) {
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
               return res.status(200).send({ "message": "already existed" })
            } else {
                const addbook = await getRepo(Saved).createQueryBuilder().insert().values({ user: userId, post: postId }).execute();
                return res.status(201).send({ "message": "success" })
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}



export default addBook;