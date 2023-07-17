"use client"
import { ActionIcon } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { HiDocumentRemove } from "react-icons/hi";


export type ImagePreviewProps = {
    image: string | FileWithPath;
    onRemove: () => void;
};

const ImagePreview = ({ image, onRemove }:ImagePreviewProps) => {
    return (
        <div className="image-preview">
            <img src={image.toString()} alt="preview" />
            <ActionIcon onClick={onRemove}><HiDocumentRemove/></ActionIcon>
        </div>
    );
};

export default ImagePreview;