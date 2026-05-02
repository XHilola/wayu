import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({type:'timestamp'})
  createdAt!: string;

  @CreateDateColumn({ type:'timestamp',nullable: true })
  updatedAt?: string;
}
