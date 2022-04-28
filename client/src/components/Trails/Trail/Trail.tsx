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

    const onLike = () => {
        dispatch(likeTrail(trail._id));
        setCurrentId(0);
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
                <Button size='small' color='primary' onClick={onLike}>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp; Like &nbsp;
                    {trail.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deleteTrail(trail._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};