import React from "react";
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
    const trails: TrailStructure[] = useSelector((state: any) => state.trails);

    console.log(trails);

    return (
        <>
            {!trails.length ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {trails.map((trail: TrailStructure) => (
                        <Grid key={trail._id} item xs={12} sm={6}>
                            <Trail trail={trail} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};