import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Anlagentyp } from "./Anlagentyp";

@Entity()
export class Anlagen {
  @PrimaryGeneratedColumn()
  idAnlagen: number;

  @Column()
  fk_betreiber: number;

  @Column()
  fk_hersteller: number;

  @OneToOne((type) => Anlagentyp)
  @JoinColumn({ name: "fk_anlagentyp" })
  fk_anlagentyp: Anlagentyp;

  @Column()
  fk_adresse: number;

  @Column()
  installationsort: string;

  @Column()
  inbetriebnahme: Date;

  @Column()
  anlagenname: string;

  @Column()
  seriennummer: string;

  @Column()
  bemerkung: string;

  @Column()
  aktiviert: number;

  @Column()
  kennung: string;

  @Column()
  ipaddress: string;

  @Column()
  tcpTriggerPort: number;

  @Column()
  emailenabled: number;
}
