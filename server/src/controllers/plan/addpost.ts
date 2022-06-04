import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";



const addPlan = async (req: Request, res: Response) => {
    console.log("addPlan도입");
    try {
        // const { nickname,title,day, diary, address,hashtage, image1, image2,image3,image4} = req.body
        // if(!nickname || !address || !image1){
        //     return res.status(400).send({'message' : 'input error'})
        // }
        
          console.log(req.body);
          if (req.body) {
            const plan = await getRepo(Plan).create(req.body);
            /* .createQueryBuilder()
            .insert()
            .into(Plan)
            .values([{
              title: req.body.title,
              user: req.body.user
            }])
            .execute(); */
            console.log(plan);
            const results = await getRepo(Plan).save(plan);
            if (results) {
              console.log(results);
              return res.send(results);
            } res.send('Cannot save plan.');
          } res.send('Request transmission error');
    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }


  
}


export default addPlan;