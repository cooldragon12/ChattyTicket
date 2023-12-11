export const  EMOTION = [
    'Anger', 'Disgust', 'Happy', 'Neutral', 'Sad', 'Surprise'
]
export const TOXICITY = ['Blaming Others', 'Cyberbullying',
'Gameplay Experience Complaints', 'Gamesplaining',
'Multiple Discrimination', 'Not toxic', 'Sarcasm']

export const EMOTION_COLOR =[
    'red', 'green', 'yellow', '#808080', 'blue', 'orange'
]
export const TOXICITY_COLOR = [
    'red', '#800080', 'yellow', 'cyan', 'blue', '#808080', '#008000'
]

// one hot decoding
export const decode = (arr: number[], categ: string[]) => {
    const index = arr.indexOf(Math.max(...arr));
    return categ[index];
}

export type IModelOutput = {
    "toxicity": number[],
    "emotion": number[],
}