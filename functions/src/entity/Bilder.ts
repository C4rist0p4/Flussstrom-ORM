import { Entity, Column, Timestamp, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bilder {
  @PrimaryGeneratedColumn()
  idBilder: number;

  @Column("int")
  fk_anlagen: number;

  @Column("date")
  datum: Timestamp;

  @Column("text")
  bild: string;

  @Column("text")
  bemerkung: string;

  @Column("text")
  url: string;

  @Column("text")
  thumburl: string;

  @Column("int")
  kamera: number;

  @Column("text")
  emailstatus: string;
}
