import React from "react";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import HomePage from "../pages/Home";
import LoginRegisterPage from "../pages/LoginRegister";
import NotFoundPage from "../pages/NotFound";
import ProfilePage from "../pages/Profile";
import MemberPage from "../pages/Member";
import MainLayout from './../layout/index'

function RoutesPage() {
    return (
        <BrowserRouter>
                <MainLayout>
                    <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/loginRegister' element={<LoginRegisterPage />}></Route>
                    <Route path='/member' element={< MemberPage/>}></Route>
                    <Route path='/profile' element={< ProfilePage/>}></Route>
                    <Route path='/noauth' element={< ProfilePage/>}></Route>
                    <Route path='*' element={< NotFoundPage/>}></Route>
                    </Routes>
                </MainLayout>
        </BrowserRouter>
    )
}

export default RoutesPage