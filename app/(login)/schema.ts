import { z } from 'zod/v4';

const baseSchema = {
    email: z.email('Must enter a valid email'),
    password: z.string().min(1, 'Must enter a password')
};

export const loginSchema = z.object(baseSchema);

export const registerSchema = z.object(baseSchema).extend({
    nickname: z.string().min(1, 'Must enter a nickname')
});

export const forgotPassSchema = z.object({
    email: z.email('Must enter a valid email')
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPassSchema = z.infer<typeof forgotPassSchema>;
