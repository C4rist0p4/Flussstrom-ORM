import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Anlagentyp {
  @PrimaryGeneratedColumn()
  idAnlagentyp: number;

  @Column()
  leistung: number;

  @Column()
  anschlusswerte: string;

  @Column()
  datenanschluss: string;

  @Column()
  tiefgang: number;

  @Column()
  datenblatt: string;

  @Column()
  handbuch: string;

  @Column()
  bemerkungtyp: string;

  @Column()
  bezeichnung: string;
}
