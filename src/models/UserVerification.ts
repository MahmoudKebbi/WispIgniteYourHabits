import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   CreateDateColumn,
} from 'typeorm';
import { User } from './User';

export type VerificationType = 'email_verification' | 'password_reset';

@Entity('user_verifications')
export class UserVerification {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column({ type: 'varchar', length: 255 })
   token: string;

   @Column({
      type: 'enum',
      enum: ['email_verification', 'password_reset'],
   })
   type: VerificationType;

   @Column({ type: 'timestamp with time zone' })
   expires_at: Date;

   @CreateDateColumn({ type: 'timestamp with time zone' })
   created_at: Date;
}
