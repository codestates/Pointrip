import { Request, Response } from 'express';
import { getRepo } from '../../app';
import Saved from '../../entity/saved';
import bookRouter from '../../routes/bookmark';
import token from '../token-functions';


const getBook = async (req :Request, res :Response) => {


    console.log("getBook도입")
   
    try {
     
        const accessTokenData: any = await token.isAuthorized(req);
        console.log(accessTokenData.id)
        await getRepo(Saved).createQueryBuilder()
        .leftJoinAndSelect('Saved.user','user')
        .leftJoinAndSelect('Saved.post','post')
        .where({
            user: accessTokenData.id
        }).execute()
        
        
        
        
        .then((data: any) => {
            
                console.log(data)
           
            
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }


   
}



export default getBook;