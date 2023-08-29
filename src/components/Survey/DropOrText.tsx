"use client"
import { Button, Container, FileInput, Flex, Group, Text, Textarea } from "@mantine/core"
import DropPhoto from "./Dropzone"
import { FileWithPath } from "@mantine/dropzone"
import { useEffect, useState } from "react"

type DropOrTextProps = {
    handleInputs: (text: string, files: File[]) => void
}

const DropOrText = (props: DropOrTextProps) => {
    const [text, setText] = useState("")
    const [files, setFiles] = useState<File[]>([])

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
            
        </>
    )
}

export default DropOrText;