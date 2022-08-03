import { Button, Box, extendTheme } from "@chakra-ui/react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { Actions, AddNote, Archive, Dashboard, EditNote, Home, Login, Register, Trash, ViewNote } from "./pages";
import { userSelector } from "./redux/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export const theme = extendTheme({
    colors: {
        tags: {
            100:'#9da8e9',
            200:'#f69696',
            300:'#9281d7'
        },
        notes:{
            100:'#f3f3d2'
        }
    },
    fonts: {
        brandFont: `'Handlee', cursive`,
        heading: `'Montserrat',sans-serif`,
        body: `'Montserrat',sans-serif`
    },
    components: {
        Alert: {
            variants: {
                noteCreated: {
                    container: {
                        color: "#F5E8E4",
                        bg: "#411530",
                        borderBottom: '2px Solid',
                        borderColor: '#fff',
                        bottom: '60px'
                    }
                },
                noteEdited: {
                    container: {
                        color: "#F7CCAC",
                        bg: "#3A3845",
                        borderBottom: '3px Solid',
                        borderColor: '#fff',
                        bottom: '80px'
                    }
                },
                noteDeleted: {
                    container: {
                        color: "#FCF0C8",
                        bg: "#911F27",
                        borderBottom: '3px Solid',
                        borderColor: '#fff',
                        bottom: '80px'
                    }
                }
            }
        }
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
    <Box bg={'#ccccff42'}>
    <Button as={Link} to={'/'}  fontWeight={'normal'} fontFamily={'cursive'} color={'primary.400'} position={'absolute'} ml={3} mt={3} fontSize={'xl'} zIndex={2} p={'2px 9px'} borderRadius={'11%'} _hover={{bg:'linear-gradient(299deg, rgba(229,229,247,1) 0%, rgba(136,130,240,1) 100%)', color:'gray.900', transition:'background 1s ease-in-out' }}>
    Home 
    </Button>
    <Outlet/>
    </Box>
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
                <Route path='archive' element={<Archive/>}/>
                <Route path='trash' element={<Trash/>}/>
                <Route path='view' element={<ViewNote/>}/>
            </Route>
        </Routes>
      );
}

export default App;
