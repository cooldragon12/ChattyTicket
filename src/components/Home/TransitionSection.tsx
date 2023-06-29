"use client"
import { BackgroundImage, Container, Flex, Text } from "@mantine/core"
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import JettJPEG from "@/assets/images/jett.jpeg";

export default function TransitionSection(){
    
    const [inHover, setInHover] = useState(false);
    useEffect(()=>{

    },[inHover])
    return(
        <motion.div
            onHoverStart={()=>setInHover(true)}
            onHoverEnd={()=>setInHover(false)}
            style={{position:"relative",display:"flex", justifyContent:"center", alignItems:"center",overflow:"hidden",height:"70vh",width:"100%"}}
        >
            <Text 
                color="white"
                weight={"bold"}
                size={"4em"}
                style={{zIndex:4,
                    textShadow:inHover?"0px 0px 15px 1px #000000":"0px 0px 0px 0px #000",
                    transition:"all 0.2s ease-in-out"
                }}
            >
                play. lose.git gud.
            </Text>
            <motion.div style={{
                height:"100%",
                width:"100%",
                position:"absolute",
                backdropFilter:`blur(${inHover? 12:0}px)`,
                zIndex:1,
                transition:"all 0.2s ease-in-out"
            }}
            
            />
                <BackgroundImage
                    src={JettJPEG.src}
                    pos={"absolute"} h="100%" w="100%"
                    sx={{
                        bottom:0,
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: -2,
                        filter:"brightness(70%)"
                    }}
                
                />
        </motion.div>
    )
}