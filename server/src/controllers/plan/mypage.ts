import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any } from 'typeorm';
import Photo from '../../entity/photo';
import Point from '../../entity/point';


const myPage = async (req: Request, res: Response) => {
    console.log("mypage도입")
    try {
        const { email } = req.params
        console.log(email)
        const user1 = await getRepo(User).find(
            {
                select: ["id"],
                where: { email: email }
            }
        ).then((userid: any) => {

            console.log(userid[0].id)
            getRepo(Plan).find(
                {
                    select: ["id"]
                }
            ).then(async (data1: any) => {
                let post_id = {};


                console.log(data1[1].id)


                const post = await getRepo(Point).find(
                    {
                        select: ["id", "post.title"]
                        , relations: ['post']
                        , where: [{ 'pointnum': 1, 'post': data1[0].id }]
                    }
                ).then(async (data: any) => {

                    let f_pointid = {};

                    // console.log(data[i].id)
                    await getRepo(Photo).createQueryBuilder().select("image1").where({
                        point: data[0].id
                    }).execute().then((data1: any) => {
                        // for(let i = 0 ;i<data.length;i++){

                        for (let i = 0; i < data.length; i++) {

                            // f_pointid[i] = data[i].post
                            // f_pointid[i].image1 = data1[i].image1

                        }
                        console.log(f_pointid)


                    })

                    return res.status(200).send(f_pointid)


                })

            })






        })



    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPage;