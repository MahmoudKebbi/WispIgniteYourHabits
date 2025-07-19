import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export type ItemType = 'consumable' | 'equipment' | 'badge' | 'currency';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

@Entity('items')
@Unique(['name'])
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['consumable', 'equipment', 'badge', 'currency'],
  })
  type: ItemType;

  @Column({
    type: 'enum',
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
  })
  rarity: ItemRarity;

  @Column({ type: 'text', nullable: true })
  effect?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
