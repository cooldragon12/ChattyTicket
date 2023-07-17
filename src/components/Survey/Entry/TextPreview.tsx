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
            <div>Text {index}</div>
            <ActionIcon onClick={onRemove}><HiDocumentRemove/></ActionIcon>
        </div>
    )
}

export default TextPreview;