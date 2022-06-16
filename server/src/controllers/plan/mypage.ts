import { Request, Response } from 'express';
import Post from '../../entity/post'
import { getRepo } from "../../app";
import User from '../../entity/user'
import { Any, SimpleConsoleLogger } from 'typeorm';
import Photo from '../../entity/photo';
import token from '../token-functions';
import Saved from '../../entity/saved';


const myPage = async (req: Request, res: Response) => {
    console.log("mypage도입")
    try {
        const accessTokenData: any = await token.isAuthorized(req)
        console.log("userID = >", accessTokenData.id)
        if (!accessTokenData) {
            console.log('토큰값이 없습니다.');
            return res.status(401)
                .send('토큰값이 없습니다.');
        }
        await getRepo(Post).createQueryBuilder("a").select("a.id as postId,a.title,c.image1,b.username")
            .leftJoin('a.user', 'b')
            .leftJoin('a.photos', 'c')
            .where({
                user: accessTokenData.id
            }).execute(
        ).then(async (data: any) => {



            let list = data.map((obj: {
                postId: any; name: any;
            }) => {
                return obj.postId
            });
            console.log(list)
            for (let i = 0; i < list.length; i++) {
                await getRepo(Saved).createQueryBuilder().select("userId")
                    .where({
                        post: list[i]
                    }).execute()

                    .then(async (datas: any) => {

                        data[i].storage = datas
                    })

            }
            console.log(data)
            return res.status(200).send(data)

        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default myPage;