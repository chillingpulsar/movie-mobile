import { z } from 'zod/v4';

export const updateEmailSchema = z.object({
    email: z.email('Must enter a valid new email')
});

export const updateInfoSchema = z.object({
    nickname: z.string().min(1, 'Must enter a new nickname')
});

export const updatePassSchema = z
    .object({
        pass: z.string().min(8, 'Must enter a new password'),
        confirmPass: z.string()
    })
    .superRefine(({ pass, confirmPass }, ctx) => {
        if (pass !== confirmPass) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPass']
            });
        }
    });

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export type UpdateInfoSchema = z.infer<typeof updateInfoSchema>;
export type UpdatePassSchema = z.infer<typeof updatePassSchema>;
