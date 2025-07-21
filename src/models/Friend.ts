import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  Check,
} from 'typeorm';
import { User } from './User';

@Entity('friends')
@Unique(['user1', 'user2'])
@Check(`"user1_id" <> "user2_id"`)
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user1_id' })
  user1: User;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user2_id' })
  user2: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
