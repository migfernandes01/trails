import React, { useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase
} from '@material-ui/core';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import useStyles from './styles';
import { Trail as TrailStructure } from '../../../api';
import { useDispatch } from 'react-redux';
import { deleteTrail, likeTrail } from '../../../redux/actions/trails';
import { ThumbUpAltOutlined } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

interface TrailProps {
    trail: TrailStructure;
    setCurrentId: (_id: any) => void;
}

export const Trail = (props: TrailProps): JSX.Element => {
    const { trail } = props;
    const { setCurrentId } = props;

    // state for likes
    const [likes, setLikes] = useState<string[]>(trail.likes || []);

    // profile in localstorage
    const userProfileInLocalStorage = localStorage.getItem('profile');

    const user = (JSON.parse(userProfileInLocalStorage || '{"message": "not existent"}' ));

    // get styles into classes object
    const classes = useStyles();

    // initialize dispatch
    const dispatch = useDispatch();
    // initialize history
    const history = useHistory();

    const userId = (user?.result?.googleId || user?.result?._id);
    const hasLikedPost = trail.likes && trail.likes.find((like) => like === userId);

    //console.log('LIKES:', likes);

    // function to like a trail
    const onLike = async () => {
        // dispatch new like action
        dispatch(likeTrail(trail._id));
        // set current id to 0
        // setCurrentId(0);
        if(trail.likes){
            // if user liked the post
            if(hasLikedPost){   
                // take user like out of trail likes
                setLikes(trail.likes.filter((id) => id !== userId));
            } else {
                setLikes([...trail.likes, userId]);
            }
        }
    };

    // redirect user to specific trail details page
    const openTrail = () => history.push(`/trails/${trail._id}`)

    useEffect(() => {
        console.log('Likes changed');
        console.log('LIKES:', likes);
    }, [likes]);

    // JSX component for the likes frontend logic
    const Likes = (): JSX.Element => {
        // if trail has likes
        if(likes.length > 0) {
            // determine if you liked the trail (logged in with google or regular email/pw)
            return hasLikedPost
            ? ( 
                <>
                    {console.log('HAS LIKED')}
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;{ likes.length > 2 ? `You and ${likes.length - 1 } others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    {console.log('HAS NOT LIKED')}
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }
        // if trail has no likes
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openTrail}>       
                <CardMedia 
                    className={classes.media} 
                    image={trail.selectedFile 
                        || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                    title={trail.title} 
                />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{trail.author}</Typography>
                    <Typography variant='body2'>{moment(trail.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === trail.authorId || user?.result?._id === trail.authorId) && (
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(trail._id)}>
                            <MoreHorizIcon fontSize='medium' />
                        </Button>
                    </div>
                )}
                <div className={classes.description}>
                    <Typography variant='body2' color="textSecondary">{trail.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{trail.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color="textSecondary">{trail.description}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={onLike} disabled={!user?.result}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === trail.authorId || user?.result?._id === trail.authorId) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deleteTrail(trail._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
                )}           
            </CardActions>
        </Card>
    );
};