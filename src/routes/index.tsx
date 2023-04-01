import React from "react";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import DemoPage from "../pages/Login/demo";
import RegisterPage from "../pages/Register";
import UserPage from "../pages/User";
import MainLayout from './../layout/index'

function RoutesPage() {
    return (
        <BrowserRouter>
                <MainLayout>
                    <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/login' element={<DemoPage />}></Route>
                    <Route path='/register' element={< RegisterPage/>}></Route>
                    <Route path='/user' element={< UserPage/>}></Route>
                    </Routes>
                </MainLayout>
        </BrowserRouter>
    )
}

export default RoutesPage