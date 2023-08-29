"use client"
import { ActionIcon } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { HiDocumentRemove } from "react-icons/hi";


export type ImagePreviewProps = {
    image: FileWithPath;
    onRemove: () => void;
};

const ImagePreview = ({ image, onRemove }: ImagePreviewProps) => {

    return (
        <>
            <div className="image-preview">
                <ActionIcon onClick={onRemove}><HiDocumentRemove /></ActionIcon>
                <img src={window.URL.createObjectURL(image)} alt={`preview-${image.name}`} width={200} height={100} />
            </div>
        </>
    );
};

export default ImagePreview;