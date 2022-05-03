import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
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

interface TrailProps {
    trail: TrailStructure;
    setCurrentId: (_id: any) => void;
}

export const Trail = (props: TrailProps): JSX.Element => {
    const { trail } = props;
    const { setCurrentId } = props;

    // get styles into classes object
    const classes = useStyles();

    // initialize dispatch
    const dispatch = useDispatch();

    // function to like a trail
    const onLike = () => {
        // dispatch new like action
        dispatch(likeTrail(trail._id));
        // set current id to 0
        setCurrentId(0);
    };

    // profile in localstorage
    const userProfileInLocalStorage = localStorage.getItem('profile');

    const user = (JSON.parse(userProfileInLocalStorage || '{"message": "not existent"}' ));

    // JSX component for the likes frontend logic
    const Likes = (): JSX.Element => {
        // if trail has likes
        if(trail.likes && trail.likes.length > 0) {
            // determine if you liked the trail (logged in with google or regular email/pw)
            return trail.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;{ trail.likes.length > 2 ? `You and ${trail.likes.length - 1 } others` : `${trail.likes.length} like${trail.likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{trail.likes.length} {trail.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }
        // if trail has no likes
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    }

    return (
        <Card className={classes.card}>
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
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(trail._id)}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>
            <div className={classes.description}>
                <Typography variant='body2' color="textSecondary">{trail.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{trail.title}</Typography>
            <CardContent>
                <Typography variant='body2' color="textSecondary">{trail.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={onLike} disabled={!user?.result}>
                    <Likes />
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deleteTrail(trail._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};