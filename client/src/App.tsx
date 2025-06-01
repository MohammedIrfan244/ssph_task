import { Provider } from "react-redux"
import AppRouter from "./route/AppRouter"
import store from "./store/store"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
        />
        <AppRouter />
      </Provider>
    </>
  )
}

export default App
