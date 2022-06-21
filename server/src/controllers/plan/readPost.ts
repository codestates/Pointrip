import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any, Index } from 'typeorm';
import Photo from '../../entity/photo';
import token from '../token-functions';
import saved from '../../entity/saved'


const myPost = async (req: Request, res: Response) => {
    console.log("mypost도입")
    try {
    
        
        const postid = req.params
        console.log(postid)
        const postId = postid.postId
        console.log(postid.postId)
        await getRepo(Post).createQueryBuilder("a").select
        ("a.id as postId,b.id,a.title,a.diary,a.day,a.address,c.image1,c.image2,c.image3,c.image4,c.image5,b.username,b.profileImg ,b.introduction")
        .leftJoin('a.user','b')
        .leftJoin('a.photos','c')
        .where({
            id: postId
        }).execute(
        ).then(async (data1: any) => {

            console.log(data1)
            console.log(data1[0].postId)

            await getRepo(saved).createQueryBuilder().select("userId")
            .where({
                post: data1[0].postId
            }).execute().then(async (datas: any) => {let list: never[] =[];
           
             list  = datas.map(function ( item: any, index: any ,array: any) {
                    return item
                })
                console.log(list)
                console.log(list.length)
                data1[0].storage = list;
                data1[0].postLike = list.length
              

            //    datas.forEach((element: any) => { console.log(element)
            //     storage[index] = element 
                
            //    });
               
               
                res.status(200).send(data1[0])
            })




        
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPost;