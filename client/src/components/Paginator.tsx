import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getPostsByPage} from "../features/ApiActions";

const Paginator = () => {

    const active = useAppSelector(state=>state.page.currentPage);
    const total = useAppSelector(state=>state.page.totalPages);
    const dispatcher = useAppDispatch();

    const handlePageSelection = (page:number)=>{
        dispatcher(getPostsByPage(page))
    }

    let items = [];
    // @ts-ignore
    for (let number = 1; number <= total; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={()=>handlePageSelection(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>{items}</Pagination>
            <br/>
        </div>
    );

};

export default Paginator;