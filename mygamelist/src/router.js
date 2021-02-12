import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  props: {
    user : {
      type: Object
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/screens/Home.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      props: { authType: 'Login' },
      component: () => import('@/components/screens/Auth.vue'),
    }, 
    {
      path: '/signup',
      name: 'Sign Up',
      props: { authType: 'Sign Up' },
      component: () => import('@/components/screens/Auth.vue'),
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('@/components/screens/Logout.vue'),
    },
  ]
})
router.beforeEach((to, from, next) => {
  if( (to.name === 'Sign Up') || (to.name === 'Login') ) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next()
  } else {
    next() 
  }
})


export default router


// const Routes = React.memo(props => {
//   const { 
//     user, setUser, clearUser, homepageData, handleBasePageClass
//   } = props

// return(
//   <Switch>
//     <Route
//       exact path="/"
//       render = { props =>
//         homepageData && <Home homepageGames={homepageData} user={user} />
//       }
//     />

//     <Route
//       path="/login"
//       // component remounts component to refresh new route and input values
//       // this is for switching btw login and signup, as Auth does both
//       component={props => user ?
//         <Redirect to={{pathname: '/'}}/> :
//         // pass authType prop to render Login Auth 
//         <Auth {...props} authType='Login' setUser={setUser} />
//       }
//     //   render={props => {
//     //     console.log('user: ', user)
//     //     console.log('user is logged? : ', user ? true : false)
//     //     if (user) {
//     //       return <Redirect to="/"/>
//     //     } else {
//     //       // pass authType prop to render login Auth 
//     //       return <Auth {...props} authType='Login' setUser={setUser} />
//     //     }
//     // }}
//     />

//     <Route
//       path="/signup"
//       component={props => user ?
//         <Redirect to={{pathname: '/'}}/> :
//         // pass authType prop to render signup Auth 
//         <Auth {...props} authType='Sign Up' setUser={setUser} />
//       }
//     />
//     <Route
//       exact path="/logout"
//       render={props => <Logout {...props} clearUser={clearUser} user={user} />}
//     />
//     <Route
//       path="/game/:gameid"
//       render={props => <GamePage {...props} handleBasePageClass={handleBasePageClass} />}
//     />
//   </Switch>
// )
// })

// export default Routes
