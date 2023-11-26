import "./App.css";
import Products from "./BitcoinAndSolana";
//@ts-ignore
import store from "./redux/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Products />}>
      <Route path="dashboard" element={<Products />} />
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
