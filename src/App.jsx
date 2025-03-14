import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import StoreDetails from "./pages/StoreDetails";
import CartPage from "./pages/CartPage";
import {Login, Signup} from "./pages/LoginSignup";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/store/:id" element={<StoreDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route 
          path="/cart" 
          element={
            <CartPage 
              
            />
          } 
        />
    </Routes>
  );
}

export default App;
