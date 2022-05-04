import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
// @ts-ignore
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { Trail } from "../../api";
import { useSelector, useDispatch } from 'react-redux';
import { createTrail, updateTrail } from '../../redux/actions/trails';
import { RootState } from "../../redux/reducers";

// interface to describe component state
interface FormState {
    title: string;
    description: string;
    tags: string[];
    selectedFile: string;
}

interface FormProps {
    currentId: null | number;
    setCurrentId: (_id: any) => void;
}

export const Form = (props: FormProps): JSX.Element => {
    // extract currentId and setCurrentId from props
    const { currentId, setCurrentId } = props;

    // get trail from redux global state RootState
    const trail = useSelector((state: RootState) => currentId ? state.trails.trails.find((t: Trail) => t._id === currentId) : null);

    // trailData object state
    const [trailData, setTrailData] = useState({
        title: '',
        description: '',
        tags: [''],
        selectedFile: '',
    });

    // profile in localstorage
    const userProfileInLocalStorage = localStorage.getItem('profile');

    const [user, setUser] = useState(JSON.parse(userProfileInLocalStorage || '{"message": "not existent"}' ));

    // get styles into classes object
    const classes = useStyles();

    // instance of dispatch
    const dispatch = useDispatch();   

    // any time trail(redux global state) changes set trail data
    useEffect(() => {
        if(trail){
            setTrailData(trail)
        }
    }, [trail]);

    // if user is not found
    if(!user.result) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please sign in to add your trails and like other trails  
                </Typography>
            </Paper>
        );
    }  

    // function to handle form submittion
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        // if current ID is not null (means we are editing a trail)
        if(currentId) {
            // dispatch a new update action (id, data from form)
            dispatch(updateTrail(currentId, { ...trailData, author: user.result.name }));
        } else {    // else
            // dispatch a new create action (data from form)
            dispatch(createTrail({ ...trailData, author: user.result.name, authorId: user?.result._id || user?.result.googleId }));
        }
        onClear();  
    }

    // function to handle clear form
    const onClear = (): void => {
        setCurrentId(null);
        setTrailData({
            title: '',
            description: '',
            tags: [''],
            selectedFile: '',
        })
    }  

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing a' : 'Creating a new'} Trail</Typography>
                <TextField
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth 
                    value={trailData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrailData({ ...trailData, title: e.target.value })}
                />
                <TextField
                    name='description' 
                    variant='outlined' 
                    label='Description' 
                    fullWidth 
                    value={trailData.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrailData({ ...trailData, description: e.target.value })}
                />
                <TextField
                    name='tags'
                    variant='outlined' 
                    label='Tags' 
                    fullWidth 
                    value={trailData.tags}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrailData({ ...trailData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={({ base64 } : { base64: string } ) => setTrailData({ ...trailData, selectedFile: base64 })}
                    />
                </div>
                <Button 
                    className={classes.buttonSubmit} 
                    variant='contained' 
                    color="primary"
                    size='large'
                    type='submit'
                    fullWidth
                >
                    Submit
                </Button>
                <Button 
                    variant='contained' 
                    color="secondary"
                    size='small'
                    onClick={onClear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};