import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Benutzer {
  @PrimaryGeneratedColumn()
  idBenutzer: number;

  @Column()
  Passwort: string;

  @Column()
  Anmeldename: string;

  @Column()
  RegistriertSeit: number;

  @Column()
  idStatus: number;

  @Column()
  idPerson: number;

  @Column()
  idDevice: string;
}
