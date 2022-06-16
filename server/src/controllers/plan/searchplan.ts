import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";



const searchPlan = async (req: Request, res: Response) => {
    console.log("searchPlan도입")
    try {
        const post = await getRepo(Plan).find().then((data: any) => {
                res.status(200).send(data)
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }


   
}


export default searchPlan;