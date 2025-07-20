export type ItemType = 'consumable' | 'equipment' | 'badge' | 'currency';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export declare class Item {
    id: string;
    name: string;
    description?: string;
    type: ItemType;
    rarity: ItemRarity;
    effect?: string;
    created_at: Date;
    updated_at: Date;
}
