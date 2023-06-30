"use client"
import { Flex, Text, BackgroundImage, Button, Group } from '@mantine/core'
import { useRouter } from 'next/navigation'

export default function Banner() {
    const router = useRouter()  // Next.js router
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
                zIndex: -2,
            }} src="/wallpaper.jpg"   placeholder="blur">

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
                    <Text sx={{ textShadow: "0px 0px 1xp 1px #000" }} w="30%" size="1em" fw={"normal"} variant="h1" color="text">Thank you for being part of our research radiant respondents! Your insights power the future of Valorant Research!</Text>
                    <Group py={40}>
                        
                        <Button size='md'  sx={(theme)=>({border:"2pt solid #333333",outline:"text",transition:"all 0.2s ease-in-out", "&:hover":{
                                backgroundColor:theme.colors.secondary[0],
                                border:"2pt solid",
                                borderColor:theme.colors.secondary[0],
                                color:theme.colors.background_cc[1]
                            }})} variant='outline' type='button' onClick={()=>router.push("/surveys")}>PARTICIPATE</Button>
                        
                    </Group>
                </Flex>

            </Flex>
        </Flex>
    )
} 