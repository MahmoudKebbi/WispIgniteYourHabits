import { User } from './User';
import { Item } from './Item';
export declare class Inventory {
    id: string;
    user: User;
    item: Item;
    quantity: number;
    is_equipped: boolean;
    acquired_at: Date;
    updated_at: Date;
}
