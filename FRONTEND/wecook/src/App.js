import React , {useState, useEffect}from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, useHistory , Redirect} from 'react-router-dom';
import UserAPI from './api/user'
import Header from './Components/Layout/Header';
import PostBlog from './Components/blog/PostBlog';
import Home from './Components/Home'
import Login from './Components/user/Login'
import Profile from './Components/user/profile/Profile'
import Signup from './Components/user/Signup'
import ReaderBlogPage from './Components/ReaderBlogPage';
import OtherProfile from './Components/user/otherProfile/OtherProfile';
import EditBlog from './Components/blog/EditBlog'
import ListUser from './Components/user/managerUser/listUser'
import Search from './Components/Search';
function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let user = UserAPI.getCurrentUser()
    if(user)
      setIsAuthenticated(true)
  }, [])
  function PrivateRoute({ children, ...rest }) {
    return (
      isAuthenticated ?
      <Route
        {...rest}
      />
      :
      <Redirect to={"/"} />
    );
  }



  return (
    <div style={{background: 'rgb(255, 241, 184)'}}> 
      <Router >
      <Header/>
            <Switch>
            <Route exact path="/" component={Home} exact/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/users/:name" component={OtherProfile}/>
            <PrivateRoute path="/users/:name/profile" component={Profile}/>
            <Route exact path="/users/:userName/blogs/:idBlog" component={ReaderBlogPage}/>
            <PrivateRoute path='/post-blog' component={PostBlog}/>
            <PrivateRoute path="/users/:userName/blogs/:idBlog/edit" component={EditBlog}/>
            <PrivateRoute path="/list-user" component={ListUser}/>
            <Route exact path="/search?key=:key" component={Search} />
          </Switch>
          
      </Router>
        

    </div>

  );
}

export default App;
