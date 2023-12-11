"use client"
import {stagger, useAnimate} from "framer-motion"
import {useEffect} from "react"


const useCardBackImg = (isOpen?: boolean )=>{
    const [scope, animate] = useAnimate();

    useEffect(()=>{
        animate(".shadow", isOpen ? {
            transform:"translate(1rem, 0.5rem)",
            opacity: 1,
           
        }:{
            transform:"translate(0rem, 0rem)",
            opacity:0,
            
        },{
            type:"spring",
            duration:0.3,
            delay: isOpen ? stagger(0.1, { startDelay: 0.2 }) : 0
        })
        animate(".card-images:nth-child(4)", isOpen ? {
            transform:"translate(-1rem, -0.5rem)",
            filter: " drop-shadow(4px 1px 4px #F8C6C7)"
            
        }:{
            transform:"translate(0rem, 0rem)",
            filter:"drop-shadow(3px 1px 4px #4444dd00)"
        },{
            type:"spring",
            duration:0.3,
            delay: isOpen ? stagger(0.1, { startDelay: 0.1 }) : 0
        })
    }, [isOpen, animate])

    return scope
}

export  default useCardBackImg;