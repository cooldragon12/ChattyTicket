"use client"
import {useEffect, useRef} from "react"

import { animate, useInView } from "framer-motion"

const useInViewCard = ()=>{
    const refView = useRef(null)
    const isView = useInView(refView, {amount:50})
    
    useEffect(()=>{
        animate(isView?[
            [
                ".card-holder",
                {transform: "translateY(0rem)"}, // stylr
                {
                    delay:0,
                    type: "spring"
                } // options
            ],
            [
                ".card",
                { padding: "2rem" }, // stylr
                {
                    delay:0,
                    type: "spring"
                } // options
            ]
        ]:[
            [
                ".card-holder",
                {transform: "translateY(2rem)"}, // style
                {
                    delay:0,
                    type: "spring"
                } // options
            ],
            [
                ".card",
                { padding: "0rem" }, // stylr
                {
                    delay:0,
                    type: "spring"
                } // options
            ]
        ])
        console.log(isView )
    },[isView])


    return {refView, isView}
}
export default useInViewCard;