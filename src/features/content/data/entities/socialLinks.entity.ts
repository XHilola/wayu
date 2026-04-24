import { Column, Entity } from 'typeorm';
import { BaseModel } from 'src/core/base-models';

@Entity('socialLinks')
export class SocialLinks extends BaseModel {

  @Column({ length: 64 })
  title!: string;

  @Column({ length: 128 })
  icon!: string;

  @Column({ length: 128 })
  link!: string;
}
