import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Icon } from './Icon';
import { Input } from './Input';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Actions } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';

export const Auth = (): JSX.Element => {
    // use styles into classes object
    const classes = useStyles();

    // showPassword and isSignup state
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    // initialize useDispatch hook
    const dispatch = useDispatch();
    // initialize useHistory hook
    const history = useHistory();

    // handle form submit
    const handleSubmit = () => {

    };

    // handle changes
    const handleChange = () => {

    };

    // toggle show password
    const handleShowPassword = (): void => {
        setShowPassword((prevShowPassword): any => !prevShowPassword)
    };

    // toggle signin/signup
    const switchMode = (): void => {
        setIsSignup((prevIsSignup): any => !prevIsSignup);
        setShowPassword(false);
    };

    // function to handle google sign in success
    const googleSuccess = (response: GoogleLoginResponse | any): void => { 
        // extract result and token from GoogleLoginResponse
        const result = response?.profileObj;
        const token = response?.tokenId;

         try {
            // dispatch new AUTH action with a payload object containing the result and the token
            dispatch({ type: Actions.auth, data: { result, token } });
            // redirect user to /
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    // function to handle google sign in failure
    const googleFailure = () => {
        console.log('Failure google failure');     
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input 
                                    name='firstName' 
                                    label='First Name' 
                                    half
                                    autoFocus
                                    onChange={handleChange}
                                />
                                <Input 
                                    name='lastName' 
                                    label='Last Name'
                                    onChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input 
                            name='email' 
                            label='Email'
                            onChange={handleChange}
                            type='email'
                        />
                        <Input 
                            name='password' 
                            label='Password'
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input 
                                name='confirmPassword'
                                label='Confirm Password'
                                onChange={handleChange}
                                type='password'
                            />
                        )}
                        <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary'>
                            {isSignup ? 'Sign-Up' : 'Sign-In'}
                        </Button>
                        <GoogleLogin 
                            clientId='926087887156-si4ach90c5mcf4ekagjuginj83t7b8fo.apps.googleusercontent.com'
                            render={(renderProps => (
                                <Button 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    fullWidth 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant='contained'
                                >
                                    Google Sign In
                                </Button>
                            ))}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        />
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have an account? Sign In' : (
                                        "Don't have an account? Sign up"
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};