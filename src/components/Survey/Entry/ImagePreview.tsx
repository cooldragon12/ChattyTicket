"use client"
import { ActionIcon } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { HiDocumentRemove } from "react-icons/hi";


export type ImagePreviewProps = {
    image: string;
    onRemove: () => void;
};

const ImagePreview = ({ image, onRemove }: ImagePreviewProps) => {
    useEffect(() => {
        console.log(image);
    }, [image]);
    return (
        <>
            <div className="image-preview">
                <ActionIcon onClick={onRemove}><HiDocumentRemove /></ActionIcon>
                <img src={image} alt={`preview-${image}`} width={200} height={100} />
            </div>
        </>
    );
};

export default ImagePreview;