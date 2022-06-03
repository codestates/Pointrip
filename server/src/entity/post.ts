import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn } from "typeorm"
import { BaseTimeEntity } from "./base-time"
import Hashtag from "./hashtag"
import Point from "./point"
import Saved from "./saved"
import User from "./user"

@Entity()
class Post extends BaseTimeEntity {

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user!: User

    @OneToMany(() => Saved, (saved) => saved.post, {
        cascade: true
    })
    saved!: Saved[]

    @OneToMany(() => Point, (point) => point.post, {
        cascade: true
    })
    points!: Point[]

    @ManyToMany(() => Hashtag, (hashtag: any) => hashtag.posts)
    hashtags!: Hashtag[]

    @Column()
    userOrder!: number

    @Column()
    title!: string

    @Column({ type: 'date', default: () => "(current_date)" })
    day!: Date

}

export default Post;