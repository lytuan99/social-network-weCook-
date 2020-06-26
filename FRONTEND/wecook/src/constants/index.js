
import Home from '../Components/Home';
import Login from '../Components/user/Login';
import Signup from '../Components/user/Signup';
import PostBlog from '../Components/blog/PostBlog';
import Profile from '../Components/user/profile/Profile'


export const ADMIN_ROUTERS = [
    {
        path:'/home',
        component: Home,
    },
    {
        path:'/',
        component: Home,
        exact: true,
    },
    {
        path:'/login',
        component: Login,
        
    },
    {
        path:'/signup',
        component:Signup,
    },
    {
        path:'/post-blog',
        component:PostBlog,
    },
    {
        path:'/profile',
        component: Profile,
    }
]