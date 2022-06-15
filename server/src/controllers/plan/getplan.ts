import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';
import { Any } from 'typeorm';



const getPlan = async (req: Request, res: Response) => {
    console.log("getPlan도입")
    try {
      await getRepo(Photo).createQueryBuilder('a').select("a.image1,a.postId, b.title ,d.username")
     
      .leftJoin('a.post','b')
      .leftJoin('b.user' ,'d')

 
      .where({
      
      }).execute().then( (data: any) => {
        console.log(data)
        res.status(200).send(data)
    
    
    
    })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default getPlan;
