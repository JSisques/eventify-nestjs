import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TypeORMUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
