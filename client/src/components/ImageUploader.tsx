import React, {ChangeEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Button, Form} from 'react-bootstrap';
import {uploadPicture} from "../features/ApiActions";

interface ImageUploaderProps {
    postId: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ postId }) => {
    const dispatch = useAppDispatch();
    const index = useAppSelector(state=>state.page.posts.findIndex((p: IPost) => p.id === postId));
//const imgSrc = useAppSelector(state=>state.page.posts[index].imageSrc)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        dispatch(uploadPicture(postId, file as File));
   //     dispatch(updateImgSrc(imgSrc));
   //     console.log("updated imgsrc" + imgSrc);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (

            <div>
                <div className="d-flex justify-content-between">
                    <Form.Group controlId="formFile" className="mb-4">
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleButtonClick}>
                        Upload image
                    </Button>
                </div>
            </div>

    );
};

export default ImageUploader;