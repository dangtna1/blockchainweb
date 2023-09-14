import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { publicRoutes } from './routes'
import { DefaultLayout } from './components/Layout'


//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


function App() {
  
  // solid font awesome lib
  library.add(fas)


  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.Layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout><Page /></Layout>}
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
