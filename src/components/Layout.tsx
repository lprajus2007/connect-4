import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = (props) => {

    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout;