import zod, { z } from 'zod';

export const surveySchema = zod.object({
    email: zod.string({required_error: "Please enter your email. So we can contact you."}).email("Please enter a valid email address."),
    name: zod.string().nullable().optional(),
    gender: zod.string().optional(),
    age: zod.number().refine((val)=> val >= 18, { message: 'Age must be 18 or above' }),
    country: zod.string().min(1, { message: 'Please select your country.' }),
    province: zod.string().optional(),
    username: zod.string().min(1, {message:"Input your in-game username"}).refine((val)=> /^[a-zA-Z]+#[0-9]+$/.test(val), { message: 'Username must be in the format of username#1234' }),
    average_hours: zod.number().min(1, { message: 'Average hours must be 1 or above' }),
    frequency: zod.number().min(1, { message: 'Frequency must be 1 or above' }),
    in_game_rank: zod.string().min(1, { message: 'Select your rank in-game' }),
    in_game_rank_level: zod.number().min(1, { message: 'Rank level must be 1 or above' }).max(3, { message: 'Rank level must be 3 or below' }),
    server: zod.string().min(1, { message: 'Please select your server you, where you often play.' }),
    felt_from_the_trashtalks: zod.string().min(1, { message: 'Please select your emotion.' }),
    reason_for_talking_back: zod.string().min(1, { message: 'Please type your reason.' }),
    entries: zod.array(zod.object({
        text: zod.string().optional(),
        screenshot: zod.string().optional()
    })).min(1, { message: 'Please add at least one entry. But if you want to join to our raffle input atleast 20.' })
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
