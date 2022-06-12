import { Request, Response } from 'express';
import Post from '../../entity/post'
import Photo from '../../entity/photo'
import user from '../../entity/user'
import { getRepo } from "../../app";
import token from '../token-functions';



const addPlan = async (req: Request, res: Response) => {
    console.log("addPlan도입")

    try {
        const { title, date, diary, address, latitude, longtitude} = req.body
        const accessTokenData: any = await token.isAuthorized(req);
       console.log("req = ",req);
       const images: any = req.files;
       	console.log(title, date,diary,address,latitude,longtitude)
        console.log("이미지스",images)
        let imagesArray;
        let imagePaths;
        if (images) {
            imagesArray = images.map((oneFile: any) => {
              return String(oneFile.path);
            });
            imagePaths = imagesArray.join(",");
          }
          console.log("이미지패스",imagePaths)
          console.log("이미지어레이",imagesArray)
        if (!title || !date || !address || !latitude || !longtitude) {
            return res.status(401).send({ "message": "인풋값오류" })
        } else if (!accessTokenData) {
            console.log('토큰값이 없습니다.');
            return res.status(401)
                .send('토큰값이 없습니다.');
        }
        await getRepo(Post).createQueryBuilder().insert().values(
            {
                user: accessTokenData.id, address: address, day: date, diary: diary, title: title, latitude: latitude, longtitude: longtitude // 아이디 토큰 값으로 변경
            }
        ).execute().then(async (data: any) => {
            const postid = data.identifiers[0].id
            console.log(postid)

            // getRepo(Photo).createQueryBuilder().insert().values(
            //     {
            //         post : data.identifiers[0].id , image1 :image.image1,image2 :image.image2,image3 :image.image3,image4 :image.image4,image5 :image.image5
            //     }
            // ).execute().then(async (data: any) => {
            //     res.status(201).send({
            //         message : "일정이 생성되었습니다.",
            //         postid : postid
            //     })
            // })
        })



    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error');
    }



}


export default addPlan;
