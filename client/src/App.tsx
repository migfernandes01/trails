import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@material-ui/core';
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from './components/Home/Home';
import { Auth } from './components/Auth/Auth';
import { TrailDetails } from "./components/TrailDetails/TrailDetails";

const App = (): JSX.Element => {
    // user state, getting 'profile' from localStorage OR user: 'not existent'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || '{"user": "not existent"}'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={() => <Redirect to='/trails' />} />
                    <Route exact path='/trails' component={Home} />
                    <Route exact path='/trails/search' component={Home} />
                    <Route exact path='/trails/:id' component={TrailDetails} />
                    <Route exact path='/auth' component={() => (!user.result ? <Auth /> : <Redirect to='/trails' />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
