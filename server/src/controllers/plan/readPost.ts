import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any } from 'typeorm';
import Photo from '../../entity/photo';



const myPost = async (req: Request, res: Response) => {
    console.log("mypage도입")
    try {
       

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPost;