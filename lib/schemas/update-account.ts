import { z } from 'zod/v4';

export const updateEmailSchema = z.object({
    email: z.email('Must enter a valid new email')
});

export const updateNicknameSchema = z.object({
    nickname: z.string().min(1, 'Must enter a new nickname')
});

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export type UpdateNicknameSchema = z.infer<typeof updateNicknameSchema>;
