import type { User } from '@supabase/supabase-js';

export type ExtendedUser = User & {
    user_metadata: {
        nickname: string;
        avatar_url: string | null;
    };
};
