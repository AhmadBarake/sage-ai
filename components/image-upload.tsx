"use client";

import { useEffect, useState } from "react";
import {CldUploadButton} from "next-cloudinary";
import Image from "next/image";


interface ImageUploadProps {
    value: string; 
    onChange: (src: string) => void;
    disabled?:boolean;
};

// I'm bypassing cloudinary hydration errors by setting telling the component to mount only after server side rendering is done
// this is the useState / useEffect portion of this file
//TODO: Replace Cloudinary image upload with my own AWS S3 Upload. 

export const ImageUpload =({
    value,
    onChange,
    disabled
}: ImageUploadProps) => {
    const[isMounted, setisMounted] = useState(false);
    useEffect(()=>{
        setisMounted(true);
    },[]);
    
    if (!isMounted) {
        return null;
    }
return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
        <CldUploadButton 
        onUpload={(result: any)=> onChange(result.info.secure_url)}
        options={{
            maxFiles:1
        }}
        uploadPreset="xsulcudx"
        >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
         <div className="relative h-40 w-40 ">
        <Image fill alt="Upload" src={value || "/placeholder.svg"} className="rounded-lg object-cover" />    
        </div>   
        </div>
        </CldUploadButton>
    </div>
)
}