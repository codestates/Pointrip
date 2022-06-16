import { Data } from 'aws-sdk/clients/firehose';
import { Request, Response } from 'express';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';
import token from '../token-functions';


const getBook = async (req: Request, res: Response) => {


    console.log("getBook도입")
    try {
        const accessTokenData: any = await token.isAuthorized(req);
        console.log(accessTokenData.id)
        console.log(accessTokenData.username)
        await getRepo(Saved).createQueryBuilder('a').select("a.postId,b.title,c.image1 ,d.username")

            .leftJoin('a.post', 'b')
            .leftJoin('b.photos', 'c')
            .leftJoin('b.user', 'd')
            .where({
                user: accessTokenData.id
            }).execute()
            .then(async (data: any) => {
             
              
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



export default getBook;