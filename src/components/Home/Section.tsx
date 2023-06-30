"use client"

import {motion,useScroll, useInView, useTransform} from "framer-motion"

import CardLanding from "../Card";
import HarborImg from "@/assets/images/harbor_noback.png"
import KillJoyImg from  "@/assets/images/kj_noback.png"
import JettImg from "@/assets/images/2_black_.png"




export default function ProcessSection(){
    
    const { scrollY } = useScroll();
    const xRange = [0, 1000,1600, 1700, 2000]
    const opacityRange = [-600,300,350, 800,2000]
    const scale =useTransform(scrollY, xRange, opacityRange)
    return (
        <motion.div
            style={{overflow:"hidden",height:"100vh",width:"100%",backgroundColor:"#F1ECE9", position:"relative", zIndex:5,display:"flex", alignItems:"center"}}
        >
            <motion.div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                gap:"4rem",
                width:"fit",
                position:"absolute",
                translateX:scale,
                
            }}>
                <CardLanding  img={HarborImg} alt="Harbor Card" description="Our research will mostly benefit thee Valorant Community, it enlightens other Valorant players about the common toxic words used in the game and how the players usually feel while playing the game. It also benefits the Valorant Developers and future researchers who will undergo this topic." title="HELP"/>
                <CardLanding  img={KillJoyImg} alt="KJ Card" description="Participate in Our Valorant Survey and Shape the Future of the Game!" title="Unleash Your Voice, Agents!"/>
                <CardLanding  img={JettImg} alt="Jett Card" description="To make healthy gameplay finding the problem is better." title="Make Healthy Gameplay"/>
            </motion.div>
        </motion.div>
    )
}