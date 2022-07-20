import { Box,Flex,HStack,Menu,Heading,MenuButton,Avatar,MenuList,MenuItem,Text } from "@chakra-ui/react";
import { Link,NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutOption = () => {
        dispatch(logOut());
        navigate("/");
    }

    return (
    <Box bg={'whiteAlpha.900'} px={4} h={'4rem'} boxShadow={'0 2px 5px 0 var(--nav-shadow), 0 2px 10px 0 #b7a1de'}>
        <Flex h={'4rem'} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={'dashboard'}>
                <Heading letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} fontFamily={'brandFont'} fontWeight={'medium'} fontSize={'24px'} lineHeight={'32px'} color={'#7c1fd3'} >Doodles</Heading>
            </Link>      
            <HStack as={'nav'} spacing={4} ml={'auto'} mr={'12'} display={{ base: 'none', md: 'flex' }}>
                <NavLink to={'add'} className={({ isActive }) => isActive ? 'activeStyle' : undefined} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
                    <Text fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'}  textTransform={'uppercase'}><i className="bi bi-pen"></i>Add</Text>                   
                </NavLink>
                <NavLink to={'action'} className={({ isActive }) => isActive ? 'activeStyle' : undefined}  p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
                    <Text fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'}  textTransform={'uppercase'}><i className="bi bi-cloud-upload"></i>Update / <i className="bi bi-trash3"></i>Delete</Text>
                </NavLink>
            </HStack>
            <Flex alignItems={'center'} mr={'5'}>
                <Menu>
                    <MenuButton cursor={'pointer'}>
                        <Avatar name={'R L'} bg={'#9b9bfe'} color={'#fffade'} className={'avatar'}  />
                    </MenuButton>
                    <MenuList>
                        <MenuItem fontSize={'md'} onClick={logOutOption}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </Box>
)
}

export default Navbar;