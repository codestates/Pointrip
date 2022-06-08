import { Request, Response } from 'express';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';


const delBook = async (req :Request, res :Response) => {


    console.log("delBook도입")
    const {postId , userId} = req.body
    if(!postId||!userId){
        res.status(400).send({'message' : 'input error'})
    }
    const  addbook = await getRepo(Saved).createQueryBuilder().delete().where({post :postId, user : userId}).execute();
    return res.status(200).send({"message":"success"})
}


export default delBook;