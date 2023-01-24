import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Singer } from "./signer.entity";
import { Genre } from "./genre.entity";

@Entity({ name: "songs" })
@Unique(["name", "singerId"])
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ name: "singer_id" })
  singerId: number;

  @ManyToOne(() => Singer, (singer) => singer.songs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "singer_id" })
  singer: Singer;

  @ManyToOne(() => Genre, { onDelete: "SET NULL" })
  @JoinColumn({ name: "genre_id" })
  genre: Genre;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
