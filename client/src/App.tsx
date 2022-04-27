import React, { useEffect, useState } from "react";
import {
    Container,
    AppBar,
    Typography,
    Grow,
    Grid
} from '@material-ui/core';
import trails from './images/mountain.png';
import { Form } from './components/Form/Form';
import { Trails } from './components/Trails/Trails';
import useStyles from './styles';
import { useSelector, useDispatch } from "react-redux";
import { getTrails } from './redux/actions/trails';

const App = (): JSX.Element => {
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
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Trails</Typography>
                <img className={classes.image} src={trails} alt='trails' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}> 
                            <Trails setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}> 
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;
