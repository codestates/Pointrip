import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm"
import { BaseTimeEntity } from "./base-time"
import Hashtag from "./hashtag"
import Point from "./point"
import Saved from "./saved"
import User from "./user"

@Entity()
class Post extends BaseTimeEntity {

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn({
      referencedColumnName: 'id'
    })
    user!: User;

    @Column()
    userId!: number;

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

    @Column({
      default: 0
    })
    title!: string

    @Column({ type: 'date', default: () => "(current_date)" })
    day!: Date

}

export default Post;