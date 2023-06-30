"use client"
import { Container, Flex, Group, Text, TextInput, Textarea } from "@mantine/core";
import DropPhoto from "../Survey/Dropzone"
import { useState } from "react";

const SampleForm = () => {
    const [text, setText] = useState('')
    const [drop, setDrop] = useState('');
    return(
        <Flex gap={"4rem"} direction={"column"} w={"90%"} h={"100%"} justify={"center"} align={"center"} >
            <Text p={"lg"} weight={"bold"} size={"3rem"} variant="h1">Try the Model</Text>
            <Flex gap={"lg"} justify={"center"} align={"center"}>
                <Flex gap={"md"} justify={"center"} align={"center"}>
                    
                    <DropPhoto onChange={(e)=>setDrop(e.type)}/>
                    <Text>Or</Text>
                    <Textarea w={"100%"} h="100%" onChange={(e)=>setText(e.target.value)}/>
                </Flex>

                <Flex justify={"center"} align={"center"} direction={"column"} w={"25%"} h={"100%"} sx={(theme)=>({borderRadius:"16px", boxShadow:theme.shadows.lg})} gap={"lg"}>
                    <Text  weight={"bold"}>Emotion: <Text weight={"normal"} variant="p" color="green">{text? "Happy":""}</Text></Text>
                    <Text weight={"bold"}>Toxicity: <Text weight={"normal"} variant="p" color="blue">{text?"Neutral":""}</Text></Text>

                </Flex>
            </Flex>
        </Flex>
    )
}

export default SampleForm;