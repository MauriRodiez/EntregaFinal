import { routes } from "./utils/routes";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import { CartProvider } from "./context/CartContext";
import CheckOut from "./components/CheckOut";
import OrderSuccess from "./components/OrderSuccess";
import NotFound from "./components/NotFound"

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<ItemListContainer />} />
          <Route path={`${routes.category}/:category`} element={<ItemListContainer />} /> 
          <Route path={routes.detail} element={<ItemDetail />} />
          <Route path={routes.cart} element={<CheckOut />} />
          <Route path={`${routes.success}/:orderId`} element={<OrderSuccess />} />
          <Route path={routes.noPage} element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
