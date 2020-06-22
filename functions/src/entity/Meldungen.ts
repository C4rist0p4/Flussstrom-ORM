import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, Timestamp, } from "typeorm";
import { Meldungstyp } from "./Meldungstyp";

@Entity()
export class Meldungen {

  @PrimaryGeneratedColumn()
  idMeldungen: number

  @Column("int")
  fk_anlagen: number;

  @OneToOne((type) => Meldungstyp)
  @JoinColumn({ name: "fk_meldungstyp" })
  fk_meldungstyp: Meldungstyp;

  @Column("time")
  datum: Timestamp;

  @Column({
    length: 100,
  })
  bemerkungMel: string;

  @Column("time")
  timestamp_device: Timestamp;
}
