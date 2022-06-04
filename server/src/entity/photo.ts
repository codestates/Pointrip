import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Point from "./point"

@Entity()
class Photo {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Point, (point) => point.photos, {
        onDelete!: "CASCADE",
    })
    @JoinColumn()
    point!: Point

    @Column()
    image!: string

    @Column()
    isSample!: boolean

}

export default Photo;