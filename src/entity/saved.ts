import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import User from "./user"
import Post from "./post"

@Entity()
class Saved {

  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, user => user.saved, {
    onDelete: "CASCADE",
  })
  user!: User

  @ManyToOne(() => Post, post => post.saved, {
    onDelete: "CASCADE",
  })
  post!: Post
  
}

export default Saved;