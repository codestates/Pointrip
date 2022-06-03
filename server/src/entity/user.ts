import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BaseTimeEntity } from "./base-time"
import Post from "./post"
import Saved from "./saved"

@Entity()
export default class User extends BaseTimeEntity {

  @OneToMany(() => Post, (post) => post.user, {
    cascade!: true
  })
  posts!: Post[]

  @OneToMany(() => Saved, (saved) => saved.user, {
      cascade!: true
  })
  saved!: Saved[]

  @Column({
      unique!: true,
      default!: 0
  })
  username!: string

  @Column({
    default!: 0
  })
  password!: string

  @Column({
      nullable!: true
  })
  bio!: string

  @Column({
      unique!: true,
      default!: 0
  })
  email!: string

  @Column({
      unique!: true,
      nullable!: true
  })
  phone!: string

  @Column({
    nullable!: true
  })
  image!: string

  @Column({
    default!: false
  })
  isAdmin!: boolean

}
