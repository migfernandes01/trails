import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';
import { getTrail } from '../../redux/actions/trails';

export const TrailDetails = (): JSX.Element => {
    const { trail, trails, isLoading } = useSelector((state: any) => state.trails);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    // extract id from params
    const { id } = useParams<{id: string}>();

    // once id changes
    useEffect(() => {
        // dispatch new get trail action
        dispatch(getTrail(id));
    }, [id]);

    if(!trail && !isLoading){
        return (
            <p>Post not found</p>
        )
    }

    if(isLoading){
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress  size='7em'/>
            </Paper>
        )
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
            <div className={classes.section}>
            <Typography variant="h3" component="h2">{trail.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{trail.tags.map((tag: any) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{trail.description}</Typography>
            <Typography variant="h6">Created by: {trail.author}</Typography>
            <Typography variant="body1">{moment(trail.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
            <img className={classes.media} src={trail.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={trail.title} />
            </div>
        </div>
        </Paper>
    );
};