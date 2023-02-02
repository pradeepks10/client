import React, { useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import useStyles from "./styles";
import { getPosts } from "../actions/posts";
const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //this will get number of pages from redux state.
    const {numberOfPages} = useSelector((state) => state.posts);
 
      //this will trigger a fn which is return in this after every render
    //to amke it trigger conditionally , pass  array with dependent parameter
    useEffect(() =>{
        if(page) dispatch(getPosts(page));
    },[page]);

    return (
        <Pagination
            classes={{ul:classes.ul}}
            count = {numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={ (item) => (
                <PaginationItem {...item} component={Link}  to={`/posts?page=${item.page}`} />
            )}
        />
    )
};


export default Paginate;