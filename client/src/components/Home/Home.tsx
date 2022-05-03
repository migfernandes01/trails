import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { Form } from '../Form/Form';
import { Trails } from '../Trails/Trails';
import Pagination from '../Pagination';
import { useDispatch } from "react-redux";
import { getTrails, getTrailsBySearch } from '../../redux/actions/trails';
import useStyles from './styles';

// useQuery hook for URL search params
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const Home = () => {
    // state for current ID selected
    const [currentId, setCurrentId] = useState(null);
    // state for search value
    const [search, setSearch] = useState('');
    // state for tags value
    const [tags, setTags] = useState<string[]>([]);

    // useStyles into classes object
    const classes = useStyles();
    
    // instantiate useDispatch
    const dispatch = useDispatch();

    // use useQuery hook
    const query = useQuery();

    // use useHistory hook
    const history = useHistory();

    // check URL for page query (page 1 if no query)
    const page = query.get('page') || 1;

    // check URL for search query
    const seatch = query.get('search');
    
    // dispatch new action to fetch trails when component is rendered
    useEffect(() => {
        dispatch(getTrails());
    }, [currentId, dispatch]);

    // function to handle key press event
    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // if key pressed was 'enter'
        if(event.keyCode === 13) {
            // search trail
            searchTrail();
        }
    };

    // handle tag adittion
    const handleAddTags = (tag: string) => setTags([...tags, tag])

    // handle tag deletion
    const handleRemoveTags = (tagToRemove: string) => setTags(tags.filter((tag) => tag !== tagToRemove))

    // function to handle search
    const searchTrail = () => {
        // if we have a non-empty search terms
        if(search.trim()){
            // dispatch new action -> fetch search trail
            dispatch(getTrailsBySearch({ search, tags: tags.join(',') }));
        } else {    // if there is no search terms
            // redirect to homepage
            history.push('/');
        }
    };

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}> 
                        <Trails setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}> 
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField 
                                name='search'
                                variant='outlined'
                                label='Search Trails'
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput 
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAddTags}
                                onDelete={handleRemoveTags}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchTrail} variant='contained' color='primary'>
                                Search
                            </Button>
                        </AppBar>
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