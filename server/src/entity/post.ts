import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn } from "typeorm"
import { BaseTimeEntity } from "./base-time"
import Saved from "./saved"
import User from "./user"
import Photo from "./photo"

@Entity()
class Post extends BaseTimeEntity {

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    user!: User

    @OneToMany(() => Saved, (saved) => saved.post, {
        cascade: true
    })
    saved!: Saved[]

    @OneToMany(() => Photo, (photo) => photo.post, {
        cascade!: true,
    })
    photos!: Photo[]


    @Column()
    title!: string

    @Column({ type: 'date', default: () => "(current_date)" })
    day!: Date

    @Column()
    diary!: string

    @Column()
    address!: string
    @Column()
    latitude!: string
    @Column()
    longtitude!: string
}

export default Post;