import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import Post from "./post"

@Entity()
class Hashtag {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToMany(() => Post, (post) => post.hashtags)
    @JoinTable()
    posts!: Post[]

    @Column({
        unique!: true
    })
    content!: string

}

export default Hashtag;