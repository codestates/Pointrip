import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';
import { Any } from 'typeorm';



const getPlan = async (req: Request, res: Response) => {
    console.log("getPlan도입")
    try {
      
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default getPlan;
