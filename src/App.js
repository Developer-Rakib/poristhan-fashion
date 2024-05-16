import './App.css';
import Header from './Pages/Shared/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import Home from './Pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './Pages/Shared/Footer';
import RequireAuth from './Pages/Shared/RequireAuth';
import RequireAdmin from './Pages/Shared/RequireAdmin';
import RequireUser from './Pages/Shared/RequireUser';
import NotFound from './Pages/NotFound/NotFound';
import AddOrderInfo from './Pages/Home/AddOrderInfo/AddOrderInfo';
import ViewBookingData from './Pages/ViewBookingData/ViewBookingData';
import SingleSearch from './Pages/SingleSearch/SingleSearch';
import AddMemo from './Pages/AddMemo/AddMemo';
import CreateOrder from './Pages/CreateOrder/CreateOrder';
import ManageUsers from './Pages/ManageUsers/ManageUsers';


function App() {

  return (
    <div className=" text-center">





      <Header></Header>
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>

        <Route path='/bookingEntry' element={
          <RequireAuth>
            <RequireAdmin>
              <AddOrderInfo />
            </RequireAdmin>
          </RequireAuth>
        } ></Route>

        <Route path='/createOrder' element={
          <RequireAuth>
            <RequireAdmin>
              <CreateOrder />
            </RequireAdmin>
          </RequireAuth>
        }></Route>

        <Route path='/searchByDate' element={<RequireAuth><ViewBookingData /></RequireAuth>}></Route>
        <Route path='/singleSearch' element={<RequireAuth><SingleSearch /></RequireAuth>}></Route>

        <Route path='/addMemo' element={
          <RequireAuth>
            <RequireAdmin>
              <AddMemo />
            </RequireAdmin>
          </RequireAuth>
        }></Route>

        <Route path='/manageUsers' element={
          <RequireAuth>
            <RequireAdmin>
              <ManageUsers />
            </RequireAdmin>
          </RequireAuth>
        }></Route>

        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/signUp' element={<SignUp></SignUp>} ></Route>
        {/* <Route path='/purchase/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>} ></Route>
        <Route path='/payment/:id' element={<RequireAuth><Payment></Payment></RequireAuth>} ></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route path='myOrder' element={<RequireUser><MyOrder></MyOrder></RequireUser>} ></Route>
          <Route path='addReview' element={<RequireUser><AddReview></AddReview></RequireUser>} ></Route>
          <Route index element={<MyProfile></MyProfile>} ></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>} ></Route>
          <Route path='manageAllOrders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>} ></Route>
          <Route path='manageProduct' element={<RequireAdmin><ManageProduct></ManageProduct></RequireAdmin>} ></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>} ></Route>
        </Route>
        <Route path='/myPortfolio' element={<MyPortfolio></MyPortfolio>} ></Route>
        <Route path='/blogs' element={<Blogs></Blogs>} ></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/signUp' element={<SignUp></SignUp>} ></Route>
        <Route path={'*'} element={<NotFound></NotFound>} ></Route> */}
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
