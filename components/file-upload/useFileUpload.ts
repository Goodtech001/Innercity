import { ChangeEvent, DragEvent, useEffect, useState } from "react";

export type FileUploaderVariant = "default" | "dropzone";

export interface FileUploaderProps {
    variant?: FileUploaderVariant;
    label?: string;
    onFilesSelected?: (files: FileList | File[]) => void;
    className?: string;
}

export default function useFileUpload(
    file: FileList | File[],
    setFile: React.Dispatch<React.SetStateAction<FileList | File[]>>,
    onFilesSelected?: (files: FileList | File[]) => void,
) {
    const [fileURLs, setFileURLs] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        setFile(fileArray);
        if (onFilesSelected) {
            onFilesSelected(files);
        }
    };

    const generateFileURLs = (files: File[] | FileList) => {
        // if its a file array
        if (Array.isArray(files)) {
            const urls = files.map((file) => URL.createObjectURL(file));
            setFileURLs(urls);
            return;
        } else {
            // if its a filelist
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setFileURLs(urls);
        }
    };

    const deletePhoto = (index: number) => {
        const newFiles = [...file];
        newFiles.splice(index, 1);
        setFile(newFiles);
    };

    useEffect(() => {
        generateFileURLs(file);
    }, [file]);

    // Handlers for default file input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    // Handlers for dropzone variant
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    return {
        file,
        isDragging,
        fileURLs,
        handleInputChange,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFiles,
        setFile,
        setIsDragging,
        deletePhoto,
    };
}
