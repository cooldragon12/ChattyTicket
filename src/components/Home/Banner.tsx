"use client"
import { Flex, Text, BackgroundImage } from '@mantine/core'

export default function Banner() {
 
    return (
        <Flex pos={"relative"} direction={"column"} align={"center"} justify={"center"} h="100vh">
            {/* <Flex direction="column" justify="center" align="center" w="50%">
                <Text variant="h1" color="text">ChattyTicket</Text>
                <Flex sx={{overflow:"hidden"}} justify="center" align="center" w="100%" h="70%">
                    <Image style={{}} width={1100} height={700} src={Jett} alt="Jett Banner" />
                </Flex>
            </Flex>
            <Flex w="50%" justify="center" align="center">
                <Text variant="h1" color="text">ChattyTicket</Text>
            </Flex> */}

            <BackgroundImage pos={"fixed"} h="100%" w="100%" sx={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                zIndex: 0,

                // ":after":{ // Fade edges of around the image to white
                //     content: '""',
                //     position: "absolute",
                //     top: 0,
                //     left: 0,
                //     width: "100%",
                //     height: "100%",
                //     background: "linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 140%)",

                // },
                // ":before":{ // Fade edges of around the image to white
                //     content: '""',
                //     position: "absolute",
                //     top: 0,
                //     left: 0,
                //     width: "100%",
                //     height: "100%",
                //     background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 110%)"
                // }
            }} src="/wallpaper.jpg">

            </BackgroundImage>
            {/* Text shadoww */}
            <Flex direction={"column"} justify={"center"} align={"center"} h="100%" w="100%" sx={(theme) => ({
                backgroundColor: theme.colors.background_cc,
                clipPath: "polygon(0 0, 35% 0, 100% 90%, 0 100%)",
                zIndex: 2,
            })}>
                <Flex w="90%" direction={"column"}>
                    <Text sx={{ fontFamily: "Valorant Font", textShadow: "0px 0px 1xp 1px #000", lineHeight: "1em" }} size="5em" variant="h1" color="text">welcome player! </Text>
                    <Text sx={{ textShadow: "0px 0px 1xp 1px #000" }} size="2em" fw={"normal"} variant="h1" color="text">Hi! we are vvm - VALO VIBEZ MONITOR!</Text>

                </Flex>

            </Flex>
        </Flex>
    )
} 