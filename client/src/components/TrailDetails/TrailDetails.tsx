import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';
import { getTrail, getTrailsBySearch } from '../../redux/actions/trails';
import { RootState } from '../../redux/reducers';
import { Trail } from '../../api'; 
import { CommentSection } from './CommentSection';

export const TrailDetails = (): JSX.Element => {
    // get fields from redux global state
    const { trail, trails, isLoading } = useSelector((state: RootState) => state.trails);
    // initialize hooks
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

    // System of recommendations:
    // once trail changes 
    useEffect(() => {
        if(trail){
            // dispatch a new search action to seatch for trails with the same tags as the
            // current trail
            dispatch(getTrailsBySearch({ search: 'none', tags: trail?.tags.join(',') }));
        }
    }, [trail]);

    // if trail wasn't found
    if(!trail && !isLoading){
        return (
            <p>Trail not found</p>
        );
    }

    // if loading 
    if(isLoading){
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress  size='7em'/>
            </Paper>
        )
    }

    // filter current trail out of recommended trails
    const recommendedTrails: Trail[] = trails.filter((recTrail: Trail) => recTrail._id !== trail.id);

    const openPost = (id: any) => {
        history.push(`/trails/${id}`);
    };

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
                    <CommentSection trail={trail}/>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={trail.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={trail.title} />
                </div>
            </div>
            {recommendedTrails.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedTrails.map((recommendedTrail) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(recommendedTrail._id)}>
                                <Typography gutterBottom variant='h6'>{recommendedTrail.title}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{recommendedTrail.author}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{recommendedTrail.description}</Typography>
                                <Typography gutterBottom variant='subtitle1'>Likes: {recommendedTrail.likes?.length}</Typography>
                                <img src={recommendedTrail.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width='200px'/>
                            </div>
                        ))}
                    </div>
                </div>
            )}  
        </Paper>
    );
};