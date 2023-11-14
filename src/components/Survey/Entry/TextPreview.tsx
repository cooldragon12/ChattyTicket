import { ActionIcon } from "@mantine/core"
import { HiDocumentRemove } from "react-icons/hi"

export type TextPreviewProps = {
    text?: string;
    index: number;
    onRemove: () => void;
};


const TextPreview = ({text,index, onRemove}:TextPreviewProps)=>{
    return (
        <div className="image-preview">
            <ActionIcon onClick={onRemove}><HiDocumentRemove/></ActionIcon>
            <div>Text {index}</div>
        </div>
    )
}

export default TextPreview;