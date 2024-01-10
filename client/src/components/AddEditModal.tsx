import React from 'react';
import {useAppSelector} from "../app/hooks";

const AddEditModal = () => {
    const isOpen = useAppSelector(state=>state.modal.isOpen)
    return (
        <div>

        </div>
    );
};

export default AddEditModal;