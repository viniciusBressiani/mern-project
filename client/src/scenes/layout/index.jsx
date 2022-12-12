import React from 'react';
import { useState } from 'react';
import {Box, useMediaQuery} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'component/Navbar';
import Sidebar from 'component/Sidebar';


const Layout = () => {
  const isNonMobile = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
       <Sidebar
        isNonMobile = {isNonMobile}
        drawerWidth= "250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
       <Box>
        <Navbar />
        <Outlet />
       </Box> 
    </Box>
  )
}

export default Layout
