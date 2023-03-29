import React from "react";
import {HashRouter as Router, Route,Routes} from "react-router-dom";
import HomePage from "../pages/Home";
import MainLayout from './../layout/index'

function RoutesPage() {
    return (
        <Router>
                <MainLayout>
                    <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    </Routes>
                        

                </MainLayout>
        </Router>
    )
}

export default RoutesPage