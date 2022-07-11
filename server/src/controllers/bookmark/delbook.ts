import { Request, Response } from 'express';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';
import token from '../token-functions';


const delBook = async (req :Request, res :Response) => {


    console.log("delBook도입")
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
        else if (!postId) {
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
          
            if (data.length===0) {
                res.status(200).send({ "message": "already canceled" })
            } else {
                const delbook =  await getRepo(Saved).createQueryBuilder().delete().where({post :postId, user : userId}).execute();
                return res.status(201).send({"message":"success"})
            
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}




export default delBook;