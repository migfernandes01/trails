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
    author: string;
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

    // 
    const trail = useSelector((state: RootState) => currentId ? state.trails.find((t: Trail) => t._id === currentId) : null);

    // trailData object state
    const [trailData, setTrailData] = useState({
        author: '',
        title: '',
        description: '',
        tags: [''],
        selectedFile: '',
    });

    // get styles into classes object
    const classes = useStyles();

    // instance of dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        if(trail){
            setTrailData(trail)
        }
    }, [trail]);

    // function to handle form submittion
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        
        // if current ID is not null (means we are editing a trail)
        if(currentId) {
            // dispatch a new update action (id, data from form)
            dispatch(updateTrail(currentId, trailData));
        } else {    // else
            // dispatch a new create action (data from form)
            dispatch(createTrail(trailData));
        }
        onClear();
    }

    // function to handle clear form
    const onClear = (): void => {
        setCurrentId(null);
        setTrailData({
            author: '',
            title: '',
            description: '',
            tags: [''],
            selectedFile: '',
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing a' : 'Creating a new'} Trail</Typography>
                <TextField
                    name='author' 
                    variant='outlined' 
                    label='Author' 
                    fullWidth 
                    value={trailData.author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrailData({ ...trailData, author: e.target.value })}
                />
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