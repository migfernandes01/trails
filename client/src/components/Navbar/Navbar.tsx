import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Actions } from '../../constants/actionTypes';
import decode, { JwtPayload } from 'jwt-decode';

interface User {
    result: {
        name: string,
        imageUrl: string
    },
}

export const Navbar = (): JSX.Element => {
    // user state, getting 'profile' from localStorage OR user: 'not existent'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || '{"user": "not existent"}'));
    console.log('USER', user);

    // initialize useDispatch hook
    const dispatch = useDispatch();
    // initialize useHistory hook
    const history = useHistory();
    // initialize useLocation hook
    const location = useLocation();

    // useEffect to fetch user any time the location('/' to '/auth' or vice-versa)
    useEffect(() => {
        // get token from user.token in localStorage
        const token = user?.token;

        // if there is a token, check if it's expired
        if(token) {
            // decode jwt token
            const decodedToken = decode<JwtPayload>(token);
            // if token is expired
            if(decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()){
                // call logout function
                logout();
            }   
        }

        // set User to get what's in localStorage OR user: 'not existent'
        setUser(JSON.parse(localStorage.getItem('profile') || '{"user": "not existent"}'))
    }, [location]);

    // function to handle logout
    const logout = () => {
        // dispatch new logout action
        dispatch({ type: Actions.logout });

        //redirect user
        history.push('/');

        // set user to null
        setUser(null);
    };

    // use styles in classes object
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
                    🏔️🥾🚲
                </Typography>
            </div>    
            <Toolbar className={classes.toolbar}>
                {user && user.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>    
                        Sign-in
                    </Button>
                )}
            </Toolbar>      
        </AppBar>
    );
};