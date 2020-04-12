import React from 'react';
import history from './services/history';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import DashboardComponent from './pages/Dashboard';
import SignInComponent from './pages/Signin';
import NotFoundComponent from './pages/NotFound';
import AboutComponent from './pages/About';
import ProviderComponent from './pages/Provider';
import ProviderCreatePost from './pages/ProviderCreatePost';
import PostViewComponent from './pages/PostView';
import ProfileComponent from './pages/Profile';
import SearchComponent from './pages/Search';
import NoticesComponent from './pages/Notices';
import TagComponent from './pages/Tag';

const Routes: React.FC = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={DashboardComponent} />
            <Route path="/signin" exact component={SignInComponent} />
            <Route path="/notfound" exact component={NotFoundComponent} />
            <Route path="/about" exact component={AboutComponent} />
            <Route path="/provider" exact component={ProviderComponent} />
            <Route path="/profile" exact component={ProfileComponent} />
            <Route path="/search" exact component={SearchComponent} />
            <Route path="/posts" exact component={NoticesComponent} />
            <Route path="/tags" exact component={TagComponent} />
            <Route path="/tags/:alias" exact component={TagComponent} />

            <Route path="/posts/:alias" exact component={PostViewComponent} />

            <Route
                path="/provider/posts/create"
                exact
                component={ProviderCreatePost}
            />
            <Route
                path="/provider/posts/edit/:id"
                exact
                component={ProviderCreatePost}
            />

            <Redirect to="/notfound" from="*" />
        </Switch>
    </Router>
);

export default Routes;
