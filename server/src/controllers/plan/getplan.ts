import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';
import { Any } from 'typeorm';



const getPlan = async (req: Request, res: Response) => {
    console.log("getPlan도입")
    try {
      await getRepo(Photo).find(
        {
            select:["image1"],
            relations: ['post'],
            
        }
      ).then( (data: any) => {
        console.log(data)
        res.status(200).send(data)
    
    
    
    })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default getPlan;
