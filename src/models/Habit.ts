import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { User } from './User';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

@Entity('habits')
@Check(`"goal_per_period" >= 1`)
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['daily', 'weekly', 'custom'],
    default: 'daily',
  })
  frequency: HabitFrequency;

  @Column({ type: 'int' })
  goal_per_period: number;

  @Column({ type: 'int', default: 10 })
  xp_reward: number;

  @Column({ type: 'int', default: 5 })
  coin_reward: number;

  @Column({ default: false })
  is_archived: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
