/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from "react-router-dom";

import Layout from "@components/Layout";
import Home from "@screens/Home/Home";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]

export default routes;