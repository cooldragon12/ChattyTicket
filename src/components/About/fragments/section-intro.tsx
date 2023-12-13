"use client"
import { Flex, Box, BackgroundImage, Text, List } from "@mantine/core"
import SquirlingEffect from "@/assets/sqirling-effect.svg"

type SectionIntroProps = {
    name: string;
    description: string;
    ign: string;
    rank: string;
    agent: string;
    img: string;
    side: "left" | "right";

}


const DescriptionFragment = ({ name, description, ign, rank, agent }) => {
    return (
        <Flex w={"50%"} justify={"flex-end"} align={"center"}>
            <Flex gap={"lg"} direction={"column"} align={"flex-start"} w="40vw" h={"60vh"} >
                <Text weight={"bold"} size={"3.5rem"} variant="h2">{name}</Text>
                <Text size={"1.2rem"}>{description}</Text>
                <List
                    icon={
                        <Text size={"1.3rem"} weight={"bold"}>*</Text>
                    }
                >
                    <List.Item px="1.3rem" py={"0.5rem"}>IGN: {ign}</List.Item>
                    <List.Item px="1.3rem" py={"0.5rem"}>Rank: {rank}</List.Item>
                    <List.Item px="1.3rem" py={"0.5rem"}>Fav Agent: {agent}</List.Item>
                </List>
            </Flex>

        </Flex>
    )

}

const PhotoFragment = ({ img }) => {
    return (
        <Flex w={"50%"} align={"center"} justify={"center"} pos={"relative"} >
            <Box w="35vw" h={"60vh"} sx={{
                borderRadius: "16px",
            }}>
                <BackgroundImage src={img} bgr={"no-repeat"} bgsz={"contain"} w={"100%"} h={"100%"} />
            </Box>

            {/* Background */}
            <Box sx={(theme) => {
                return {
                    backgroundColor: theme.colors.secondary[0],
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                }
            }} w="49.9vw" h={"55vh"}>
                <BackgroundImage src={SquirlingEffect.src} w={"100%"} h={"100%"} />
            </Box>

        </Flex>
    )
}

const SectionIntro = ({ name, description, ign, rank, agent, img, side }: SectionIntroProps) => {
    
    return (
        <Flex w="100vw" h="90vh" pos={"relative"}>
            {
                side === "left" ?
                    <>
                        <DescriptionFragment name={name} description={description} ign={ign} rank={rank} agent={agent} />
                        <PhotoFragment img={img} />
                    </>
                    :
                    <>
                        <PhotoFragment img={img} />
                        <DescriptionFragment name={name} description={description} ign={ign} rank={rank} agent={agent} />
                    </>
            }
        </Flex>
    )
}

export default SectionIntro;