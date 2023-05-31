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
import EnvListPage from "../pages/Env/toolList";
import BillPage from "../pages/Bill";
import ProfileRoomPage from "../pages/Profile/room";
import VipPage from "../pages/Profile/vip";
import ScheduleTablePage from "../pages/ScheduleTable";
import ParkingPage from "../pages/Parking";
import ComplaintPage from "../pages/Complaint";

function RoutesPage() {
    return (
        <BrowserRouter>
                <MainLayout>
                    <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/loginRegister' element={<LoginRegisterPage />}></Route>
                    <Route path='/member' element={< MemberPage/>}></Route>
                    <Route path='/profile/:id' element={< ProfilePage/>}></Route>
                    <Route path='/profileVip' element={< VipPage/>}></Route>
                    <Route path='/profile/room/:id' element={< ProfileRoomPage/>}></Route>
                    <Route path='/room' element={< RoomPage/>}></Route>
                    <Route path='/room/:id/user' element={< RoomUserPage/>}></Route>
                    <Route path='/tool/create' element={< ToolPage/>}></Route>
                    <Route path='/tool/list' element={< ToolListPage/>}></Route>
                    <Route path='/parking' element={< ParkingPage/>}></Route>
                    <Route path='/bill' element={< BillPage/>}></Route>
                    <Route path='/complaint' element={< ComplaintPage/>}></Route>
                    <Route path='/scheduleTable' element={< ScheduleTablePage/>}></Route>
                    <Route path='/noauth' element={< NoAuthPage/>}></Route>
                    <Route path='*' element={< NotFoundPage/>}></Route>
                    </Routes>
                </MainLayout>
        </BrowserRouter>
    )
}

export default RoutesPage