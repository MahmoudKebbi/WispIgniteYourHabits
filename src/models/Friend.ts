import {
   Entity,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   CreateDateColumn,
   Unique,
   Check,
   Index,
} from 'typeorm';
import { User } from './User';

@Entity('friends')
@Unique(['user1', 'user2'])
@Check(`"user1_id" <> "user2_id"`)
@Index('IDX_FRIEND_USER1', ['user1'])
@Index('IDX_FRIEND_USER2', ['user2'])
@Index('IDX_FRIEND_USER1_USER2', ['user1', 'user2'])
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
