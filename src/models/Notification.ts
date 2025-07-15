import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './User';

export type NotificationType =
  | 'friend_request'
  | 'quest_update'
  | 'habit_reminder'
  | 'system';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['friend_request', 'quest_update', 'habit_reminder', 'system'],
  })
  @Index()
  type: NotificationType;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'uuid', nullable: true })
  reference_id?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
