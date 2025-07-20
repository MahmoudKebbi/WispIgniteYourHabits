import { User } from './User';
export type SourceType = 'web' | 'mobile' | 'iot' | 'backend' | 'internal' | 'other';
export declare class Source {
    id: string;
    name: string;
    type: SourceType;
    api_key: string;
    created_by?: User;
    created_at: Date;
    updated_at: Date;
    generateApiKey(): void;
}
