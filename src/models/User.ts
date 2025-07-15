import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export type UserRole = 'user' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password_hash: string;

  @Column({ name: 'display_name', length: 50 })
  display_name: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: UserRole;

  // ✅ Email verification
  @Column({ default: false })
  email_verified: boolean;

  @Column({ type: 'uuid', nullable: true })
  email_verification_token?: string;

  // ✅ Account status
  @Column({ default: true })
  is_active: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  // ✅ Login metadata
  @Column({ type: 'timestamp with time zone', nullable: true })
  last_login_at?: Date;

  @Column({ nullable: true })
  last_login_ip?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  // 🔐 Hash password on insert/update
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password_hash) {
      const saltRounds = 12;
      this.password_hash = await bcrypt.hash(this.password_hash, saltRounds);
    }
  }

  // ✨ Normalize email before saving
  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.trim().toLowerCase();
    }
  }

  // 🔍 Compare plain password for login
  async comparePassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password_hash);
  }
}
