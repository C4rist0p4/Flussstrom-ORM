import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Meldungen extends BaseEntity {
  @Column("int")
  fk_anlagen: number;

  @Column("double")
  fk_meldungstyp: number;

  @Column("date")
  datum: Date;

  @Column({
    length: 100
  })
  bemerkungMel: string;

  @PrimaryGeneratedColumn()
  timestamp_device: Date;
}
