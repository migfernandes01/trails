import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrails } from '../redux/actions/trails';

interface IPagination {
    page: number | string;
};

const Paginate = (props: IPagination): JSX.Element => {
    // extract page from props
    const { page } = props;
    // use styles into classes object
    const classes = useStyles(); 
    // initialize useDispatch hook
    const dispatch = useDispatch();
    //
    const { numberOfPages } = useSelector((state: any) => state.trails)

    // run it everytime page changes
    useEffect(() => {
        if(page){
            // dispatch new get trails action, passing the page
            dispatch(getTrails(page));
        }
    }, [page]);


    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/trails?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;