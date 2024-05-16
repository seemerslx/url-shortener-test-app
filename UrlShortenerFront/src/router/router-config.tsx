import { RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import About from "../components/UI/About";
import ErrorPage from "../components/UI/ErrorPage";
import Home from "../components/UI/Home";
import ProtectedRoutes from "../components/Auth/ProtectedRoute";
import RootLayout from "../components/UI/RootLayout";
import UrlsLayout from "../components/UI/UrlsLayout";
import CreateUrl from "../components/Urls/CreateUrl";
import UrlDetails from "../components/Urls/UrlDetails";
import Urls from "../components/Urls/Urls";
import Register from "../components/Auth/Register/Register";
import Login from "../components/Auth/Login/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route index element={<Navigate to='urls' />} />
            <Route path='urls' element={<UrlsLayout />}>
                <Route index element={<Urls />} />
                <Route element={<ProtectedRoutes isAdmin={false} isAnyAuthUser={true} />}>
                    <Route path=":id" element={<UrlDetails />} />
                    <Route path='create' element={<CreateUrl />} />
                </Route>
            </Route>
            <Route path="about" element={<About />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register/>}></Route>
        </Route >
    ));

const MyRouter = () => {
    return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;