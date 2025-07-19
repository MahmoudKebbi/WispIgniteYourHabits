import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export type QuestStatus = 'open' | 'in_progress' | 'completed' | 'failed';

@Entity('quests')
export class Quest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0 })
  xp_reward: number;

  @Column({ type: 'int', default: 0 })
  coin_reward: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  start_date?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  end_date?: Date;

  @Column({
    type: 'enum',
    enum: ['open', 'in_progress', 'completed', 'failed'],
    default: 'open',
  })
  status: QuestStatus;

  @Column({ default: false })
  is_friend_quest: boolean;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({
    name: 'quest_participants',
    joinColumn: { name: 'quest_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants: User[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
