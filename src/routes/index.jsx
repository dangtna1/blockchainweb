import Dashboard from '../components/Dashboard/index'
import Form from '../components/Form'
import CropsDisplay from '../components/CropsDisplay'
import Market from '../components/Market'
import History from '../components/History'
import EditCrop from '../components/CropsDisplay/EditCrop'
import CropDetail from '../components/CropsDisplay/Crop/CropDetail'

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/form', component: Form },
    { path: '/crops-display', component: CropsDisplay },
    { path: '/market', component: Market },
    { path: '/history', component: History },
    { path: '/crops-display/edit/:id', component: EditCrop },
    { path: '/crops-display/detail/:id', component: CropDetail },
    //add more public paths here
]

//when users not login yet
const privateRoutes = [
    //add more private paths here
]

export { privateRoutes, publicRoutes }
