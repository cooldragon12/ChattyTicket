"use client"
import { Card, Group, Text, Badge, Container } from "@mantine/core";
import {motion} from 'framer-motion';
import Image, { StaticImageData } from "next/image";
import {useState} from  "react";

import useCardBackImg from "@/hooks/animation/useCardBackImg";

export default function CardLanding({img,title,description, alt }: {img:string|StaticImageData, title:string, description:string, alt:string}){
    const [isHover, setIsHover ] = useState(false);
    const scope = useCardBackImg(isHover);
    const heigthSize = 325;

    return(
        <motion.div
            onHoverStart={()=>setIsHover(true)}
            onHoverEnd={()=>setIsHover(false)}
            className="card"
        >

            <Card ref={scope}  shadow="sm" padding="lg" radius="lg"sx={{width:"25em",height:"35em"}}>
                
                <Card.Section sx={{position:"relative", height:"20em", zIndex:1}}>
                    <Image className="card-images shadow" src={img}  height={heigthSize} alt={alt}/>
                    <Image className="card-images shadow" src={img}  height={heigthSize} alt={alt}/>
                    <Image className="card-images shadow" src={img}  height={heigthSize} alt={alt}/>
                    <Image className="card-images" src={img}  height={heigthSize} alt={alt}/>
                </Card.Section>
                <Card.Section  sx={{margin:"1rem",display:"flex", justifyContent:"center", flexDirection:"column",backgroundColor:"#fff",borderRadius:"10px 10px 0 0", boxShadow:"0 -7px 15px 0 #CCCCCC33", padding:"1rem", zIndex:100}} pos={"relative"}>

                    <Text  variant="h1" size={30} weight={700}>{title}</Text>
                    <Text   size="sm" color="dimmed">
                        {description}
                    </Text>
               
                </Card.Section>

               
            </Card>
        </motion.div>
    )
}