import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Habit } from './Habit';
import { Source } from './Source';

@Entity('habit_events')
export class HabitEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Habit, (habit) => habit.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @ManyToOne(() => Source, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'source_id' })
  source?: Source;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  completed_at: Date;

  @Column({ type: 'int', default: 10 })
  xp_earned: number;

  @Column({ type: 'int', default: 5 })
  coin_earned: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
