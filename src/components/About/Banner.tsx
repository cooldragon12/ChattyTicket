"use client"
import { BackgroundImage, Container, Flex, Text } from "@mantine/core";

import Reyna from "@/assets/images/reyna_smoke.jpg";

const Banner = () => {
    return(
        <Flex  h={"90vh"} px={"5rem"} py={"3rem"}>
            <Flex w={"50%"} direction={"column"} justify={"center"} align={"center"}>
                <Text sx={{lineHeight:"6rem"}} variant="h1" size='5rem' weight={700}>Welcome to our dedicated team of Valorant researchers!</Text>
                <Text variant="h2" size='1.2rem' weight={400}>We specialize in delving into the intricate world of toxicity and emotions within the Valorant community. Through our cutting-edge Bi-LSTM algorithm, we analyze player interactions, chat logs, and in-game behavior to uncover the underlying emotional dynamics at play. Our research aims to shed light on the impact of toxicity and emotions on player experience, fostering a healthier and more inclusive gaming environment. Join us as we dive deep into the realm of Valorant and pave the way for a more positive gaming community.</Text>
            </Flex>
            <Flex w={"50%"} justify={"end"} align={"center"}>
                <BackgroundImage src={Reyna.src} w="80%" h="70%"/>
            </Flex>
        </Flex>
    )
}

export  default Banner;