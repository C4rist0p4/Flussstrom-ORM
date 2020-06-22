import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meldungstyp {
    @PrimaryGeneratedColumn()
    idMeldungstyp: number;
    
    @Column("text")
    meldungsart: string;

    @Column("text")
    bemerkungMT: string;
    
    @Column("int")
    versandart: number;
}
