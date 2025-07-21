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
import { ReferenceType } from '../types/referenceTypes';

@Entity('coin_transactions')
@Index('IDX_COINTRANSACTION_USER', ['user'])
@Index('IDX_COINTRANSACTION_REFERENCE', ['reference_id'])
export class CoinTransaction {
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

   @Column({ type: 'text', nullable: true })
   reference_type?: ReferenceType;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;
}
