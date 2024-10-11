import {z} from 'zod';

export const AcceptingMessage = z.object({
    acceptMessages: z.boolean(),
})