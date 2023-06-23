"use client"
import { Flex, Text, Button, useMantineTheme, Container, BackgroundImage } from '@mantine/core'
import Image from 'next/image';
import { lazy } from 'react';
import  BackgroundBanner from '@/assets/images/wallpaper.jpg'

export default function Banner() {
    const classes = useMantineTheme();
    
    return (
        <Flex pos={"relative"}  direction={"column"} align={"center"} justify={"center"} h="100vh">
            {/* <Flex direction="column" justify="center" align="center" w="50%">
                <Text variant="h1" color="text">ChattyTicket</Text>
                <Flex sx={{overflow:"hidden"}} justify="center" align="center" w="100%" h="70%">
                    <Image style={{}} width={1100} height={700} src={Jett} alt="Jett Banner" />
                </Flex>
            </Flex>
            <Flex w="50%" justify="center" align="center">
                <Text variant="h1" color="text">ChattyTicket</Text>
            </Flex> */}
            <BackgroundImage pos={"absolute"} h="100%" w="100%" sx={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
                

                ":after":{ // Fade edges of around the image to white
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 140%)",
                    backdropFilter: "blur(4px)"
                    
                },
                ":before":{ // Fade edges of around the image to white
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 110%)"
                }
            }} src="/wallpaper.jpg"/>
            <Text sx={{zIndex:3, fontFamily:"Valorant Font"}} size={50} variant="h1" color="text">welcome player! </Text>
        </Flex>
    )
} 