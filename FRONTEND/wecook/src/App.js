import React , {useState, useEffect}from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, useHistory , Redirect} from 'react-router-dom';
import UserAPI from './api/user'
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import PostBlog from './Components/blog/PostBlog';
import Home from './Components/Home'
import Login from './Components/user/Login'
import Profile from './Components/user/profile/Profile'
import Signup from './Components/user/Signup'
import ReaderBlogPage from './Components/ReaderBlogPage';
function App() {

  // const renderRoute = () =>{
  //   let listRouter = ADMIN_ROUTERS.map((item, index) =>{
  //       console.log(item)
  //     return <Route
  //             key={index} path={item.path} component={item.component}
  //           />
  //   })
  //   return listRouter;
  // }

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
    <div style={{background: '#fff1b8'}}> 
      <Router>
        <Header/>
            <Switch>
            <Route exact path="/" component={Home} exact/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/:name/profile" component={Profile}/>
            <Route path="/:userName/blogs/:idBlog" component={ReaderBlogPage}/>
            <PrivateRoute path='/post-blog' component={PostBlog}/>
          </Switch>
        <Footer />
          
      </Router>
        

    </div>

  );
}

export default App;
