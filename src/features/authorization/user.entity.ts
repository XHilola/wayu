import { Column, Entity } from 'typeorm';
import { RolesEnum } from '../../core/enums/roles.enum';
import { loginType } from '../../core/enums/loginType.enum';
import { BaseModel } from '../../core/basemodel';

@Entity('users')
export class Auth extends BaseModel {

  @Column({ type:"enum",enum:RolesEnum,default: RolesEnum.user })
  role!: RolesEnum;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 64, unique: true })
  login!: string;

  @Column({type:"enum",enum:loginType})
  loginType!: loginType;

  @Column({ length: 128, nullable: true })
  password?: string;

  @Column({ nullable: true, type: 'date' })
  birthDate?: Date;

  @Column({ default: false })
  isActive!: boolean;

}
