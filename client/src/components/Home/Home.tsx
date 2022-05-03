import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { Form } from '../Form/Form';
import { Trails } from '../Trails/Trails';
import Pagination from '../Pagination';
import { useDispatch } from "react-redux";
import { getTrails } from '../../redux/actions/trails';
import useStyles from '../../styles';

export const Home = () => {
    // state for current ID selected
    const [currentId, setCurrentId] = useState(null);

    // useStyles into classes object
    const classes = useStyles();
    
    // instantiate useDispatch
    const dispatch = useDispatch();
    
    // dispatch new action to fetch trails when component is rendered
    useEffect(() => {
        dispatch(getTrails());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}> 
                        <Trails setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}> 
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};