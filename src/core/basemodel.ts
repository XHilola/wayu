import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;
}
