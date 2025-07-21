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

@Entity('xp_transactions')
@Index('IDX_XPTRANSACTION_USER', ['user'])
@Index('IDX_XPTRANSACTION_REFERENCE', ['reference_id'])
export class XpTransaction {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User, (user) => user.id, {
      nullable: false,
      onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column({ type: 'int' })
   amount: number;

   @Column({ length: 100 })
   reason: string;

   @Column({ type: 'uuid', nullable: true })
   reference_id?: string;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;
}
