import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ansicht {
  @PrimaryGeneratedColumn()
  idAnsicht: number;

  @Column()
  Name: string;

  @Column()
  Typ: string;

  @Column()
  FK_Anlage: number;

  @Column()
  FK_Benutzer: number;
}
