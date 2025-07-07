import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../dto/user-creation.dto';

@Entity({ name: 'users ' })
export class UserModal {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @Column({ nullable: true, type: 'text', name: 'email' })
  email?: string;

  @Column({ nullable: true, type: 'text', name: 'address' })
  address?: string;

  //for type is text because sqlite doesn't support enum type
  @Column({ type: 'text', name: 'role' })
  role: string;

  // @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
  // createdAt: Date

  // @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  // updatedAt: Date
}
