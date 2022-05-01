import React from 'react';
import { TextField, Grid, InputAdornment, IconButton, OutlinedInputProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface InputProps {
    half?: boolean;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
    autoFocus?: boolean;
    type?: string;
    handleShowPassword?: (prev: any) => void;
}

export const Input = (props: InputProps): JSX.Element => {
    return (
        <Grid item xs={12} sm={props.half ? 6 : 12}>
            <TextField 
                name={props.name}
                onChange={props.onChange}
                variant='outlined'
                required
                fullWidth
                label={props.label}
                autoFocus={props.autoFocus}
                type={props.type}
                InputProps={props.name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={props.handleShowPassword}>
                                {props.type === 'password' ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : undefined}
            />
        </Grid>
    );
};