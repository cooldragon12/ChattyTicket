"use client"
import { BackgroundImage, Flex, Text } from "@mantine/core";

import SectionIntro from "./fragments/section-intro";
import IceBox from "@/assets/images/icebox.jpg";
import JPhoto from "@/assets/devs/johndel.jpg";
import KPhoto from "@/assets/devs/kenneth.jpg";
import CPhoto from "@/assets/devs/cass.jpg";
const Banner = () => {
    return(
        <Flex  h={"90vh"} direction={"column"} px={"5rem"} py={"3rem"}>
            <Flex direction={"column"} justify={"center"} align={"center"} m="lg">
                
                    <Flex align={"center"}>
                        <Text weight={"bold"} size={"4rem"} m={"3rem"} mb={"7rem"} variant="h1">THE MEMBERS BEHIND VVM</Text>
                    </Flex>
                    <Flex sx={{
                            borderRadius:"16px",
                            overflow:"hidden",
                            ":hover":{
                                transform:"scale(1.02)",
                                filter:"brightness(1.5)",
                                transition:"all 0.5s",
                            },
                            

                        }}>
                        <BackgroundImage sx={{
                            
                        }}  src={IceBox.src}  w="70vw" h="75vh"/>
                    </Flex>
                
            </Flex>
            <Flex direction={"column"} justify={"end"} align={"center"} m="lg">
                <SectionIntro 
                    name={"Cassandra Vitug"}
                    description={"Hi! Im Cassandra, my valo friends call me Caly/ Calypso. I have been playing valorant for almost 2 years now and doing this research means a lot to me."}
                    ign={"XH Calypso #NYX"}
                    rank={"Platinum"}
                    agent={"Reyna"}
                    img={CPhoto.src}
                    side="left"
                />
                <SectionIntro 
                    name={"Johndel Encabo"}
                    description={"Hi I am Johndel, a passionate programmer and a gamer. I am a Valorant player and I am a Viper main. I am also a part of the VVM team."}
                    ign={"neverland#john"}
                    rank={"Platinum 1"}
                    agent={"Viper"}
                    img={JPhoto.src}
                    side="right"
                />
                <SectionIntro 
                    name={"Mark Kenneth Satsatin"}
                    description={"My name is Kenneth, and I play Valorant. They always call me by my name. We adore valorant, so we conducted a study on its toxicity. Valorant helps me to remove my stress and problems, which is why we focus on how to know the toxicity of players in Valorant."}
                    ign={"k3nbot#1212"}
                    rank={"Gold"}
                    agent={"Reyna"}
                    img={KPhoto.src}
                    side="left"
                />
            </Flex>
        </Flex>
    )
}

export  default Banner;