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
                <CardLanding  img={HarborImg} alt="Harbor Card" description="I don't know yer" title="Hello World"/>
                <CardLanding  img={KillJoyImg} alt="KJ Card" description="I don't know yer" title="Hello World"/>
                <CardLanding  img={JettImg} alt="Jett Card" description="I don't know yer" title="Hello World"/>
            </motion.div>
        </motion.div>
    )
}