import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';

import Point from '../../entity/point';
import { Any } from 'typeorm';



const getPlan = async (req: Request, res: Response) => {
    console.log("getPlan도입")
    try {
        const post = await getRepo(Point).find(
            {
                select: ["id", "post.title"]
                , relations: ['post']
                , where: [{ 'pointnum': 1 }]
            }
        ).then(async (data: any) => {
            type userType = {
                [key: string]: any
              }
             
            const f_pointid : userType ={};
         
                // console.log(data[i].id)
                await getRepo(Photo).createQueryBuilder().select("image1").where({
                    point : data[0].id
                }).execute().then((data1:any)=>{
                       // for(let i = 0 ;i<data.length;i++){
                     
                           for(let i = 0; i<data.length;i++){
                          
                            f_pointid[i] = data[i].post
                            f_pointid[i].image1 = data1[i].image1
                           
                           }
                           console.log(f_pointid)
                           
                    
                })

                return res.status(200).send(f_pointid)


        })
  

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default getPlan;
