import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Titel {
  @PrimaryGeneratedColumn()
  idTitel: number;

  @Column()
  Title: string;
}
