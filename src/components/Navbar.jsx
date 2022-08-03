import { Avatar, Box, Flex, HStack, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Link,NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth";
import { DeleteNavbarIcon, PenNavbarIcon, UpdateNavbarIcon } from "../assest/icon";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const avatarName = localStorage.getItem('avatarName');

    const logOutOption = () => {
        dispatch(logOut());
        navigate("/");
    }

    return (
    <Box bg={'whiteAlpha.900'} px={4} h={'4rem'} boxShadow={'0 2px 5px 0 #e1d6f4, 0 2px 10px 0 #e1d6f4'}>
        <Flex h={'4rem'} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={'dashboard'}>
                <Heading letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} fontFamily={'brandFont'} fontWeight={'medium'} fontSize={'24px'} lineHeight={'32px'} color={'#7c1fd3'} >Doodles</Heading>
            </Link>      
            <HStack as={'nav'} spacing={4} ml={'auto'} mr={'12'} display={{ base: 'none', md: 'flex' }}>
                <NavLink to={'add'} className={({ isActive }) => isActive ? 'activeStyle' : undefined} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
                    <Text fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'}  textTransform={'uppercase'}>
                        <PenNavbarIcon color={'#808080'}/>Add
                    </Text>                   
                </NavLink>
                <NavLink to={'action'} className={({ isActive }) => isActive ? 'activeStyle' : undefined}  p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
                    <Text fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'}  textTransform={'uppercase'}>
                        <UpdateNavbarIcon color={'#808080'}/>Update / <DeleteNavbarIcon color={'#808080'}/>Delete
                    </Text>
                </NavLink>
            </HStack>
            <Flex alignItems={'center'} mr={'5'}>
                <Menu>
                    <MenuButton cursor={'pointer'}>
                        <Avatar name={avatarName} bg={'#9b9bfe'} color={'#fffade'} className={'avatar'}  />
                    </MenuButton>
                    <MenuList>
                        <Link to={'dashboard'}><MenuItem pl={'8'} fontSize={'md'}>Dashboard</MenuItem></Link>
                        <Link to={'add'}><MenuItem pl={'8'}  fontSize={'md'}>Add Note</MenuItem></Link>
                        <Link to={'action'}><MenuItem pl={'8'}  fontSize={'md'}>Actions</MenuItem></Link>
                        <Link to={'archive'}><MenuItem pl={'8'}  fontSize={'md'}>Archives</MenuItem></Link>
                        <Link to={'trash'}><MenuItem pl={'8'}  fontSize={'md'}>Trash</MenuItem></Link>
                        <MenuDivider/>
                        <MenuItem pl={'8'}  fontSize={'md'} onClick={logOutOption}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </Box>
)
}

export default Navbar;