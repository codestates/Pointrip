import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Point from "./point"

@Entity()
class Photo {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Point, (point) => point.photos, {
        onDelete!: "CASCADE",
        nullable :false
    })
    @JoinColumn()
    point!: Point

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