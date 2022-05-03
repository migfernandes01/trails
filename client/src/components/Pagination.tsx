import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Paginate = (): JSX.Element => {
    // use styles into classes object
    const classes = useStyles(); 

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={5}
            page={1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/trails?page=${1}`} />
            )}
        />
    );
};

export default Paginate;