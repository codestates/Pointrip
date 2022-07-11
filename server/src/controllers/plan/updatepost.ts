import { Request, Response } from 'express';
import Post from '../../entity/post'
import token from '../token-functions';
import Photo from '../../entity/photo'
import user from '../../entity/user'
import { getRepo } from "../../app";



const updPlan = async (req: Request, res: Response) => {
    console.log("updPlan도입")
    try {
        const { title, day, diary, address, latitude, longitude} = req.body
        const postId = req.params.postId
        const accessTokenData: any = await token.isAuthorized(req);
       const images: any = req.files;
       	console.log(title, day,diary,address,latitude,longitude,postId)
        console.log(title)
        let imagesArray: any;
        let imagePaths;
        if (images) {
            imagesArray = images.map((oneFile: any) => {
              return String(oneFile.location);
            });
            imagePaths = imagesArray.join(",");
          }
        console.log("이미지",images)
        console.log("이미지어레이",imagesArray)
          console.log("이미지어레이",imagesArray)
        if (!title || !day || !address || !latitude || !longitude) {
            return res.status(401).send({ "message": "인풋값오류" })
        } else if (!accessTokenData) {
            console.log('토큰값이 없습니다.');
            return res.status(401)
                .send('토큰값이 없습니다.');
        }
        await getRepo(Post).createQueryBuilder().update().set(
            {
                address: address, day: day, diary: diary, title: title, latitude: latitude, longitude: longitude // 아이디 토큰 값으로 변경
            }
        ).where({id : postId}).execute().then(async (data: any) => {
             console.log(data)
        

            getRepo(Photo).createQueryBuilder().update().set(
                {
                    image1 :imagesArray[0],image2 :imagesArray[1],image3 :imagesArray[2],image4 :imagesArray[3],image5 :imagesArray[4]
                }
            ).where({ post : postId}).execute().then(async (data: any) => {
                res.status(201).send({
                    message : "일정이 수정되었습니다.",
            
                })
            })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}

export default updPlan;