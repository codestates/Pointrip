import { Request, Response } from 'express';
import Plan from '../../entity/post'

import Photo from '../../entity/photo'
import user from '../../entity/user'
import { getRepo } from "../../app";



const updPlan = async (req: Request, res: Response) => {
    console.log("updPlan도입")
    try {
       

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default updPlan;