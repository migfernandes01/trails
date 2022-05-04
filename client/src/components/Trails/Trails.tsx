import React, { useEffect } from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { Trail } from './Trail/Trail';
import useStyles from './styles';
import { useSelector } from "react-redux";
import { Trail as TrailStructure } from '../../api';

interface TrailsProps {
    setCurrentId: (_id: any) => void;
}

export const Trails = (props: TrailsProps): JSX.Element => {
    const { setCurrentId } = props;

    // get styles into classes object
    const classes = useStyles();

    // get trails from redux global state using selector
    const { trails, isLoading } = useSelector((state: any) => state.trails);

    if(!trails.length && !isLoading) {
        return (
            <p>No trails yet!</p>
        );
    }
    
    return (
        <>
            {isLoading ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {trails.map((trail: TrailStructure) => (
                        <Grid key={trail._id} item xs={12} sm={12} md={6} lg={3}>
                            <Trail trail={trail} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};