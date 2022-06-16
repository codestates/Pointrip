import { Request, Response } from 'express';
import Plan from '../../entity/post'
import { getRepo } from "../../app";
import Photo from '../../entity/photo';



const searchPlan2 = async (req: Request, res: Response) => {
    console.log("searchPlan도입")
    try {
        const word = req.params.search
        console.log(word)
        await getRepo(Photo).createQueryBuilder('a').select("a.image1,a.postId, b.title ,d.username")
       
        .leftJoin('a.post','b')
        .leftJoin('b.user' ,'d')
  
   
        .where(
           'b.title Like :word ', {word :`%${word}%`}
        )
        .orWhere(
            'b.address Like :word ', {word :`%${word}%`}
        )
        .execute().then( (data: any) => {
          console.log(data)

          console.log(data.length)
          if(data.length===0){
           return res.status(200).send({"message" : "검색값이없습니다."})
          }
         return res.status(200).send(data)
      
      
      
      })
  
      } catch (err) {
          console.log(err)
          return res.status(500).send('internal server error');
      }
  
  
  
  }


export default searchPlan2;