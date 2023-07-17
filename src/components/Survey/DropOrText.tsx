"use client"
import { Button,  Group,  Text, Textarea } from "@mantine/core"
import DropPhoto from "./Dropzone"
import {FileWithPath} from "@mantine/dropzone"
import {  useEffect, useState } from "react"

type DropOrTextProps = {
    handleInputs: (text: string, files: FileWithPath[]) => void
}


const DropOrText = (props: DropOrTextProps) => {
    const [text, setText] = useState("")
    const [files, setFiles] = useState<FileWithPath[]>([])
    
    const clearInputs = () => {
        setFiles([])
        text && setText("")
    }

    const handler = () => {
        props.handleInputs(text, files)
        clearInputs()
    }
    return (
        <>
        <Group>
            {
                files.map((file, index) => {
                    return (
                        <img width={"10%"} height={"10%"} key={index} src={URL.createObjectURL(file)} />
                    )
                })
            }

        </Group>
            <DropPhoto 
                multiple={true}
                onDrop={(files)=>{setFiles((prev)=> {
                    const newFiles = [...prev, ...files]
                    return newFiles
                })}}
            />
            <Text>or</Text>
            <Textarea value={text} onChange={(e)=>setText(e.target.value)} w="70%" h="70%"  placeholder="Write your entry here: (Team) MeYou: on C ....." />
            <Group>
                <Button disabled={text.length >0 || files.length > 0?false: true} onClick={handler} color="red" variant="filled" mt="1rem"  >Add Entry</Button>

                {
                    files.length > 0 || text.length > 0? <Button onClick={clearInputs} color="red" variant="default" mt="1rem" >Cancel</Button>: null
                }
            </Group>
        </>
    )
}

export default DropOrText;