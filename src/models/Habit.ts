import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   CreateDateColumn,
   UpdateDateColumn,
   Check,
   Index,
} from 'typeorm';
import { User } from './User';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';
export type Difficulty = 'very_easy' | 'easy' | 'medium' | 'hard' | 'epic';
export type Category = 'health' | 'productivity' | 'self_care' | 'chores' | 'creativity';

@Entity('habits')
@Check(`"goal_per_period" >= 1`)
@Check(`difficulty IS NULL OR difficulty IN ('very_easy', 'easy', 'medium', 'hard', 'epic')`)
@Check(
   `category IS NULL OR category IN ('health', 'productivity', 'self_care', 'chores', 'creativity')`
)
@Index('IDX_HABIT_USER', ['user'])
@Index('IDX_HABIT_NAME', ['name'])
@Index('IDX_HABIT_USER_NAME', ['user', 'name'])
@Index('IDX_HABIT_CATEGORY', ['category'])
@Index('IDX_HABIT_DIFFICULTY', ['difficulty'])
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

   @Column({
      type: 'enum',
      enum: ['very_easy', 'easy', 'medium', 'hard', 'epic'],
      nullable: true,
   })
   difficulty?: Difficulty;

   @Column({
      type: 'enum',
      enum: ['health', 'productivity', 'self_care', 'chores', 'creativity'],
      nullable: true,
   })
   category?: Category;

   @Column({ type: 'int', nullable: true })
   xp_reward?: number;

   @Column({ type: 'int', nullable: true })
   coin_reward?: number;

   @Column({ default: false })
   is_archived: boolean;

   @Column({ type: 'int', array: true, nullable: true })
   days_of_week?: number[];

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;

   @UpdateDateColumn({ type: 'timestamp with time zone' })
   updated_at: Date;
}
