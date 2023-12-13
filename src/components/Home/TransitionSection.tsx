"use client"
import { BackgroundImage, Button, Container, Flex, Text } from "@mantine/core"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import JettJPEG from "@/assets/images/jett.jpeg";
import { useRouter } from "next/navigation";

export default function TransitionSection() {
    const router = useRouter()
    const [inHover, setInHover] = useState(false);
    useEffect(() => {

    }, [inHover])
    return (
        <motion.div
            onHoverStart={() => setInHover(true)}
            onHoverEnd={() => setInHover(false)}
            style={{ position: "relative", display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", overflow: "hidden", height: "70vh", width: "100%" }}
        >
            <Text
                color="white"
                weight={"bold"}
                size={"4em"}
                style={{
                    zIndex: 4,
                    textShadow: inHover ? "0px 0px 15px 1px #000000" : "0px 0px 0px 0px #000",
                    transition: "all 0.2s ease-in-out"
                }}
                >
                play. lose.git gud.
            </Text>
                {
                    inHover ?
                        <Button
                            sx={(theme) => ({
                                border: `2pt solid ${theme.colors.background_cc[1]}`, outline: "text", transition: "all 0.2s ease-in-out", "&:hover": {
                                    backgroundColor: theme.colors.secondary[0],
                                    border: "2pt solid",
                                    borderColor: theme.colors.primary[0],
                                    color: theme.colors.background_cc[1]
                                },
                                zIndex: 4,
                                color: "white",
    
                            })} variant='outline' type='button'
                            onClick={() => router.push("/chat")}
                        >
                            Try it out
                        </Button>
                        :
                        null
                }
            <motion.div style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                backdropFilter: `blur(${inHover ? 12 : 0}px)`,
                zIndex: 1,
                transition: "all 0.2s ease-in-out"
            }}

            />
            <BackgroundImage
                src={JettJPEG.src}
                pos={"absolute"} h="100%" w="100%"
                sx={{
                    bottom: 0,
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    zIndex: -2,
                    filter: "brightness(70%)"
                }}

            />

        </motion.div>
    )
}