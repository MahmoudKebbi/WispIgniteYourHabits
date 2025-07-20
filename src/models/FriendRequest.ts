import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   CreateDateColumn,
   UpdateDateColumn,
   Unique,
   Check,
} from 'typeorm';
import { User } from './User';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

@Entity('friend_requests')
@Unique(['sender', 'receiver'])
@Check(`"sender_id" <> "receiver_id"`)
export class FriendRequest {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User, (user) => user.id, {
      nullable: false,
      onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'sender_id' })
   sender: User;

   @ManyToOne(() => User, (user) => user.id, {
      nullable: false,
      onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'receiver_id' })
   receiver: User;

   @Column({
      type: 'enum',
      enum: ['pending', 'accepted', 'rejected', 'blocked'],
      default: 'pending',
   })
   status: FriendRequestStatus;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;

   @UpdateDateColumn({ type: 'timestamp with time zone' })
   updated_at: Date;
}
