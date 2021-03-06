import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BaseTimeEntity } from "./base-time"
import Post from "./post"
import Saved from "./saved"

@Entity()
export default class User extends BaseTimeEntity {

  /* @PrimaryGeneratedColumn()
  id!: number; */

  @OneToMany(() => Post, (post) => post.user, {
    cascade!: true
  })
  posts!: Post[];

  @OneToMany(() => Saved, (saved) => saved.user, {
      cascade!: true
  })
  saved!: Saved[]

  @Column({
      unique!: true
  })
  username!: string

  @Column()
  password!: string

  @Column()
  passwordHash!: string

  @Column({
      nullable!: true
  })
  introduction!: string

  @Column({
      unique!: true
  })
  email!: string


  @Column({
    nullable!: true
  })
  profileImg!: string

  @Column({
    default!: false
  })
  isAdmin!: boolean

}
