"use client"
import { Container, Flex, Group, Text, TextInput, Textarea, Progress, Loader, MediaQuery, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { 
    EMOTION as emotion_labels, 
    TOXICITY as toxicity_labels, 
    decode, IModelOutput,
    TOXICITY_COLOR, EMOTION_COLOR
} from "@/utils/model";
import axios from "axios";

const SampleForm = () => {
    const [chat_text, setChatText] = useState('');
    const [typing, setTyping] = useState(false);
    const [emotion, setEmotion] = useState([{}]);
    const [toxicity, setToxicity] = useState([{}]);
    useEffect(()=>{
        setEmotion(emotion_labels.map((val,i)=>{
            return {[val]:0}
        }
        ));
        setToxicity(toxicity_labels.map((val,i)=>{
            return {[val]:0}
        }
        ));
    },[])
    useEffect(()=>{
        // if still typing, don't send request
        if(typing) return;
        // if text is empty, don't send request
        if(!chat_text) {setTyping(false); return;}
    },[chat_text, typing])
    async function sendRequest(text:string){
        if (!(text.length > 0)) return;
        setTyping(true);
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_AWS_URL_API}/api/classify/`, {"chat_text":text});
            const data = await res.data as IModelOutput;

            setEmotion(data.emotion.map((val,i)=>{
                let index = emotion_labels[i]
                return {[index]:(val*100).toFixed(2)}
            }));

            setToxicity(data.toxicity.map((val,i)=>{
                let index = toxicity_labels[i]
                return {[index]:(val*100).toFixed(2)}
            }));

        }catch(e){
            console.log(e);
        }finally{()=>setTyping(false)};

    }
    

    return(
        <Flex gap={"4rem"} direction={"column"} h={"100%"} justify={"center"} align={"center"} >
            <Text p={"lg"} weight={"bold"} size={"3rem"} variant="h1">Try the Model</Text>
            
                <Flex direction={"column"} gap={"lg"} justify={"center"} align={"center"} w={"80%"}>
                    
                    <Flex w={"40%"} gap={"md"} justify={"center"} align={"center"}>
                        <TextInput  w={"100%"} h="100%"  onChange={(e)=>setChatText(e.target.value)}/>
                        <Button onClick={async ()=>{setTyping(true); await sendRequest(chat_text)}} color={"red"}>Send //</Button>
                    </Flex>

                    <Flex w={"45%"}  direction={"row"} p={"md"} h={"100%"} sx={(theme)=>({borderRadius:"16px", boxShadow:theme.shadows.lg})} gap={"lg"}>
                        <Container m={0} w={"50%"}>
                            <Flex justify={"space-between"} align={"center"} pb={"md"}>
                                <Text weight={"bold"} size={"lg"} >Emotion:</Text>
                                { typing && <Loader size={"sm"} color={"red"} />}
                            </Flex>
                            <Flex direction={"column"} w={"100%"} gap={"md"}>
                            {
                                emotion.map((val,i)=>{
                                    let key = Object.keys(val)[0] as string;
                                    let value = Object.values(val)[0] as number;
                                    return(
                                        <div key={i}>
                                            <Flex justify={"space-between"} align={"center"}>
                                            <Text weight={"normal"} variant="p" color={EMOTION_COLOR[i]}>{key}</Text>
                                            <Text weight={"normal"} variant="p" color={EMOTION_COLOR[i]}>{value}%</Text>
                                            </Flex>
                                            <Progress label={`${value}%`} color={EMOTION_COLOR[i]} value={value} />
                                        </div>
                                    )
                                })
                            }
                            </Flex>
                        </Container>
                        <Container m={0} w={"50%"}>
                            <Flex justify={"space-between"} align={"center"} pb={"md"}>
                                <Text weight={"bold"} size={"lg"} >Toxicity: </Text>
                                { typing && <Loader size={"sm"} color={"red"}  />}
                            </Flex>
                            <Flex direction={"column"} w={"100%"} gap={"md"}>
                            {
                                toxicity.map((val,i)=>{
                                    let key = Object.keys(val)[0] as string;
                                    let value = Object.values(val)[0] as number;
                                    return(
                                        <div key={i}>
                                            <Flex justify={"space-between"} align={"center"}>
                                            <Text weight={"normal"} variant="p" color={TOXICITY_COLOR[i]}>{key}</Text>
                                            <Text weight={"normal"} variant="p" color={TOXICITY_COLOR[i]}>{value}%</Text>
                                            </Flex>
                                            <Progress label={`${value}%`} color={TOXICITY_COLOR[i]} value={value} />
                                        </div>
                                    )
                                })
                            }
                            </Flex>
                        </Container>

                    </Flex>
                </Flex>
        </Flex>
    )
}

export default SampleForm;