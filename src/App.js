import { Button, Box, extendTheme } from "@chakra-ui/react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { AddNote, Dashboard, Home, Login, Register } from "./pages";
import { userSelector } from "./redux/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Actions from "./pages/Dashboard/Actions";
import EditNote from "./pages/Dashboard/EditNote";

export const theme = extendTheme({
    colors: {
        tags: {
            100:'#9da8e9',
            200:'#f69696',
            300:'#9281d7'
        },
      },
    fonts: {
        brandFont: `'Handlee', cursive`,
        heading: `'Montserrat',sans-serif`,
        body: `'Montserrat',sans-serif`
    },
})

const PrivateRoute = () => {
    const { user } = useSelector( userSelector );
    const tokenPresent = user ? true : false;

    return tokenPresent 
            ?  <Box minH={'100vh'} bg={'#ccccff42'}>
                    <Navbar/>
                    <Outlet/>
                </Box> 
            :   <Navigate to="/login" />;
}

const AuthLayout = () => {
    return (
    <>
    <Button as={Link} to={'/'}  fontWeight={'normal'} fontFamily={'cursive'} color={'primary.400'} position={'absolute'} ml={3} mt={3} fontSize={'xl'} zIndex={2} p={'2px 9px'} borderRadius={'11%'} _hover={{bg:'linear-gradient(299deg, rgba(229,229,247,1) 0%, rgba(136,130,240,1) 100%)', color:'gray.900', transition:'background 1s ease-in-out' }}>
    Home 
    </Button>
    <Outlet/>
    </>
    );
}

function App() {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route element={<AuthLayout/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Register/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
			    <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='add' element={<AddNote/>}/>
                <Route path='action' element={<Actions/>}/>
                <Route path='edit' element={<EditNote/>}/>
            </Route>
        </Routes>
      );
}

export default App;
