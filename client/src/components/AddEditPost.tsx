import React from 'react';
import {useAppSelector} from "../app/hooks";

const AddEditPost = () => {
    const isOpen = useAppSelector(state=>state.modal.isOpen)
    return (
        <div>

        </div>
    );
};

export default AddEditPost;