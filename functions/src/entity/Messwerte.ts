import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Timestamp,
} from "typeorm";

@Entity()
export class Messwerte extends BaseEntity {
  @PrimaryGeneratedColumn()
  idMesswerte: number;

  @Column("int")
  fk_anlagen: number;

  @Column("int")
  fk_prozessgroesse: number;

  @Column("int")
  fk_komponente: number;

  @Column("date")
  datum: Date;

  @Column("int")
  messwert: number;

  @Column("time")
  timestamp_device: Timestamp;

  @Column("text")
  emailstatus: string;
}
