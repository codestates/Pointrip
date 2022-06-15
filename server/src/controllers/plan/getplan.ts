import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';
import { Any } from 'typeorm';
import Saved from '../../entity/saved';



const getPlan = async (req: Request, res: Response) => {
    console.log("getPlan도입")
    try {
      await getRepo(Photo).createQueryBuilder('a').select("a.image1,a.postId, b.title ,d.username")
     
      .leftJoin('a.post','b')
      .leftJoin('b.user' ,'d')

 
      .where({
      
      }).execute().then( async (data: any) => {
      
        let list = data.map((obj: {
            postId: any; name: any;
        }) => {
            return obj.postId
        });
        console.log(list)
        for(let i = 0 ; i<list.length;i++){
            await getRepo(Saved).createQueryBuilder().select("userId")
            .where({
                post: list[i]
            }).execute()
            
            .then(async (datas: any) => {
        
                    data[i].storage = datas
            })

        }
        console.log(data)
       return res.status(200).send(data)

    })

} catch (err) {
console.log(err)
return res.status(500).send('internal server error');
}



}

export default getPlan;
