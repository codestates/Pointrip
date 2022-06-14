import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any } from 'typeorm';
import Photo from '../../entity/photo';
import token from '../token-functions';



const myPost = async (req: Request, res: Response) => {
    console.log("mypost도입")
    try {
    
        
        const postid = req.params
        console.log(postid)
        const postId = postid.postId
        console.log(postid.postId)
        await getRepo(Post).createQueryBuilder().select
        ("Postid,title,diary,day,address,image1,image2,image3,image4,image5, userId,username,introduction,profileImg")
        .leftJoin('Post.user','user')
        .leftJoin('Post.photos','photo')
        .where({
            id: postId
        }).execute(
        ).then((data: any) => {

            console.log(data)
            res.status(200).send(data)
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPost;