import ReactDOM from 'react-dom/client'
import './index.css'
import {PersistGate} from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import {store} from './redux/store'
import {persistStore} from "redux-persist"
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Suspense } from 'react'

let persister = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<h1>Loading</h1>}>
    <Provider store={store}>
    <PersistGate persistor={persister}>
      <RouterProvider router={router}/>
    </PersistGate>
    </Provider>
  </Suspense>
  
)