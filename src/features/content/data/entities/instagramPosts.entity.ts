import { Column, Entity } from 'typeorm';
import { BaseModel } from 'src/core/base-models';

@Entity('instagramPosts')
export class InstagramPosts extends BaseModel {

  @Column({ length: 256 })
  image!: string;

  @Column({ length: 128 })
  link!: string;
}
