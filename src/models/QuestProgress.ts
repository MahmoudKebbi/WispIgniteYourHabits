import {
   Entity,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Quest } from './Quest';

export type ParticipantStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

@Entity('quest_progress')
export class QuestProgress {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Quest, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'quest_id' })
   quest: Quest;

   @Column({
      type: 'enum',
      enum: ['not_started', 'in_progress', 'completed', 'failed'],
      default: 'not_started',
   })
   status: ParticipantStatus;

   @Column({ type: 'timestamp with time zone', nullable: true })
   started_at?: Date;

   @Column({ type: 'timestamp with time zone', nullable: true })
   completed_at?: Date;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;

   @UpdateDateColumn({ type: 'timestamp with time zone' })
   updated_at: Date;
}
