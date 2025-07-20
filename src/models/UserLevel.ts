import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   OneToOne,
   JoinColumn,
   CreateDateColumn,
   UpdateDateColumn,
   Check,
} from 'typeorm';
import { User } from './User';

@Entity('user_levels')
@Check(`"xp_total" >= 0`)
@Check(`"xp_to_next" >= 0`)
export class UserLevel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column({ type: 'int', default: 1 })
   level: number;

   @Column({ type: 'int', default: 0 })
   xp_total: number;

   @Column({ type: 'int' })
   xp_to_next: number;

   @Column({ type: 'timestamp with time zone', nullable: true })
   level_up_at?: Date;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;

   @UpdateDateColumn({ type: 'timestamp with time zone' })
   updated_at: Date;
}
