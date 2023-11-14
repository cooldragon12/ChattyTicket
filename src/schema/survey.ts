import zod, { z } from 'zod';

export const surveySchema = zod.object({
    email: zod.string().email(),
    name: zod.string().nullable().optional(),
    gender: zod.string().optional(),
    age: zod.number().optional(),
    country: zod.string(),
    province: zod.string().optional(),
    username: zod.string(),
    average_hours: zod.number(),
    frequency: zod.number(),
    in_game_rank: zod.string(),
    in_game_rank_level: zod.number(),
    server: zod.string(),
    felt_from_the_trashtalks: zod.string(),
    reason_for_talking_back: zod.string(),
    entries: zod.array(zod.object({
        text: zod.string().optional(),
        screenshot: zod.string().optional()
    })).optional(),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
