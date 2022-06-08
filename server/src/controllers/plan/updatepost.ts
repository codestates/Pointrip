import { Request, Response } from 'express';
import Plan from '../../entity/post'
import hash from '../../entity/hashtag'
import Point from '../../entity/point'
import Photo from '../../entity/photo'
import user from '../../entity/user'
import { getRepo } from "../../app";



const updPlan = async (req: Request, res: Response) => {
    console.log("updPlan도입")
    try {
        const { user_id, title, day, hashtag,

            point } = req.body;
        console.log(user_id, point.length)
        if (!user_id || !point) {
            return res.status(400).send({ 'message': 'input error' })
        }
        const adpost = await getRepo(Plan).createQueryBuilder().insert().values({ user: user_id, title: title, day: day }).execute().then(async (data: any) => {

            const findpost_id = await getRepo(Plan).findOne(
                {
                    select: ["id"],
                    where: [{ title: title, user: user_id }]
                }).then(async (fpost_id: any) => {
                    console.log(fpost_id);
                    for (let i = 0; i < point.length; i++) {
                        const adpoint = await getRepo(Point).createQueryBuilder().insert().values(

                            { diary: point[i].diary, address: point[i].address, post: fpost_id, pointnum: point[i].point_num }).execute()
                            const findpoint_id = await getRepo(Point).findOne(
                                {
                                    select: ["id"],
                                    where: [{ pointnum: point[i].point_num, post: findpost_id }]
                                }).then(async (fpoint_id: any) => {
                                    console.log("fppId", fpoint_id)
                                    console.log(point[i].image1)
                                    const adphoto = await getRepo(Photo).createQueryBuilder().insert().values(
                                        {
                                            image1: point[i].image1, 
                                            image2: point[i].image2, 
                                            image3: point[i].image3, 
                                            image4: point[i].image4, 
                                            image5: point[i].image5, 
                                            point: fpoint_id
                                        }
                                    ).execute();
    
    
                                })
                    }


                    return res.status(201).send({ "message": "sucess" })
                })
        })


    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default updPlan;