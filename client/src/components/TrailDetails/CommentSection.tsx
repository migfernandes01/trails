import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { Trail } from '../../api/index';
import { commentTrail } from '../../redux/actions/trails';

interface IProps {
    trail: Trail;
}

export const CommentSection = (props: IProps): JSX.Element => {
    // extract trail from props
    const { trail } = props;

    // state for array of comments for our trail
    const [comments, setComments] = useState(trail?.comments);
    // state for comment
    const [comment, setComment] = useState('');
    // user state, getting 'profile' from localStorage OR user: 'not existent'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || '{"user": "not existent"}'));
    
    // initialize useDispatch hook
    const dispatch = useDispatch();

    //
    const commentsRef = useRef<HTMLDivElement>(null);

    // initialize useStyles hook
    const classes = useStyles();

    // function to handle comment submittion
    const onCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // comment structure
        const finalComment = `${user.result.name}: ${comment}`;
        // type guard
        if(trail._id){
            // dispatch new comment action creator and get new comments back
            const newComments = await dispatch(commentTrail(finalComment, trail._id) as any);
            // set comments to the new comments
            setComments(newComments);
            // clear out textfield
            setComment('');
            //
            commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>
                        Comments:
                    </Typography>
                    {comments?.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(':')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>  
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>
                            Write a comment:
                        </Typography>
                        <TextField 
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Your comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={onCommentSubmit}>
                            Submit
                        </Button>
                    </div> 
                )}
            </div>
        </div>
    );
};
