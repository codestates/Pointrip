import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any } from 'typeorm';
import Photo from '../../entity/photo';
import token from '../token-functions';



const myPost = async (req: Request, res: Response) => {
    console.log("mypage도입")
    try {
        // const accessTokenData: any = await token.isAuthorized(req)
        // console.log("userID = >", accessTokenData.id)
        // const postid = req.params
        // console.log(postid)
        // if (!accessTokenData) {
        //     console.log('토큰값이 없습니다.');
        //     return res.status(401)
        //         .send('토큰값이 없습니다.');
        // }
        // await getRepo(Photo).find(
        //     {
               
        //         relations: ['post'],
        //         where : ['postId= :postID', {postid:postid}]
        //     }
     

        // ).then((data: any) => {

        //     console.log(data)
        //     res.status(200).send(data)
        // })
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPost;