import Dashboard from '../components/Dashboard/index'
import Form from '../components/Form'
import CropsDisplay from '../components/CropsDisplay'
import Market from '../components/Market'
import History from '../components/History'

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/form', component: Form },
    { path: '/crops-display', component: CropsDisplay },
    { path: '/market', component: Market },
    { path: '/history', component: History },
    //add more public paths here
]

//when users not login yet
const privateRoutes = [
    //add more private paths here
]

export { privateRoutes, publicRoutes };