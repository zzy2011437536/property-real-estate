import React from "react";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import HomePage from "../pages/Home";
import LoginRegisterPage from "../pages/LoginRegister";
import NotFoundPage from "../pages/NotFound";
import ProfilePage from "../pages/Profile";
import MemberPage from "../pages/Member";
import MainLayout from './../layout/index'
import NoAuthPage from "../pages/NoAuth";
import RoomPage from "../pages/Room";
import RoomUserPage from "../pages/Room/roomUser";
import ToolPage from "../pages/Tool";
import ToolListPage from "../pages/Tool/toolList";
import EnvPage from "../pages/Env";
import EnvListPage from "../pages/Env/toolList";

function RoutesPage() {
    return (
        <BrowserRouter>
                <MainLayout>
                    <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/loginRegister' element={<LoginRegisterPage />}></Route>
                    <Route path='/member' element={< MemberPage/>}></Route>
                    <Route path='/profile/:id' element={< ProfilePage/>}></Route>
                    <Route path='/room' element={< RoomPage/>}></Route>
                    <Route path='/room/:id/user' element={< RoomUserPage/>}></Route>
                    <Route path='/tool/create' element={< ToolPage/>}></Route>
                    <Route path='/tool/list' element={< ToolListPage/>}></Route>
                    <Route path='/env/create' element={< EnvPage/>}></Route>
                    <Route path='/env/list' element={< EnvListPage/>}></Route>
                    <Route path='/noauth' element={< NoAuthPage/>}></Route>
                    <Route path='*' element={< NotFoundPage/>}></Route>
                    </Routes>
                </MainLayout>
        </BrowserRouter>
    )
}

export default RoutesPage