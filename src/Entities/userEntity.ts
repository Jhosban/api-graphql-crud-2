import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Entidad principal de la base de datos.
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
