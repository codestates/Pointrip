import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Post from "./post"

@Entity()
class Photo {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Post, (post) => post.photos, {
        onDelete!: "CASCADE",
        nullable :false
    })
    @JoinColumn()
    post!: Post

    @Column()
    image1!: string

    @Column({ nullable: true})
    image2!: string

    @Column({ nullable: true})
    image3!: string

    @Column({ nullable: true})
    image4!: string

    @Column({ nullable: true})
    image5!: string

  

}

export default Photo;