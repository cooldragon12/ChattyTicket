import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { text } = req.body;
        const result = await axios.post(`${process.env.NEXT_PUBLIC_AWS_URL_API}/api/classify`, {"chat_text" :text });
        res.status(200).json(result.data);
    }
    catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}