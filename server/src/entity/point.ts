import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import Photo from "./photo"
import Post from "./post"

@Entity()
class Point {

    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(() => Post, (post) => post.points, {
        onDelete!:"CASCADE",
    })
    @JoinColumn()
    post!:Post

    @OneToMany(() => Photo, (photo) => photo.point, {
        cascade!:true,
    })
    photos!:Photo[]

    @Column()
    diary!:string

    @Column()
    address!:string

}

export default Point;