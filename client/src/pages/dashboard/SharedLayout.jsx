import React from 'react';
import Wrapper from "../../assets/wrappers/SharedLayout";
import {Link, Outlet} from "react-router-dom";
import SmallSidebar from "../../components/SmallSidebar";
import BigSidebar from "../../components/BigSidebar";
import Navbar from "../../components/Navbar";

const SharedLayout = () => {
    return (
        <>
        <Wrapper>
            <main className={'dashboard'}>
               <SmallSidebar/>
                <BigSidebar/>
                <div>
                    <Navbar/>
                    <div className={'dashboard-page'}>
                        <Outlet/>
                    </div>
                </div>
            </main>

        </Wrapper>
        </>
    );
};

export default SharedLayout;
