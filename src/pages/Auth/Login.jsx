import { Box, Button, Container, Divider, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useToast} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loginUser, userSelector } from "../../redux/auth";

const Login = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [ loginInputs, setLoginInputs ] = useState({email:"",password:""});
  	const { isFetching, isSuccess, isError, errorMessage } = useSelector( userSelector );

	const handleGuestLogin = () => setLoginInputs({email:"rutz@gmail.com",password:"rutz"});
	const onSubmit = () => {
		if( loginInputs.email === "" || loginInputs.password === "" ){
            toast({
                title: "Provide credentials",
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            })
        }else{
			dispatch(loginUser(loginInputs));
        }
	}
	const handleChange = e => {
		const { name, value } = e.target;
		setLoginInputs(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	useEffect(() => {
		if (isError) {
			toast({
                title: errorMessage,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            })
		}
		if (isSuccess) {
           setTimeout(() => {navigate('/dashboard')}, 0);
		}
	}, [isError, isSuccess]);

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} fontFamily={'lato'}>
		<Stack spacing="8">
		<Stack spacing="6">
			<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
				<Heading fontSize={{ base: 'xl', md: '3xl' }} fontFamily={'lato'}>
					Log in to your account
				</Heading>
			</Stack>
		</Stack>
		<Box py={{ base: '0', sm: '8' }} px={{ base: '6', sm: '10' }} bg={'whiteAlpha.800'} boxShadow={{ base: 'none', sm: 'md' }} borderRadius={{ base: 'none', sm: 'xl' }}>
			<Stack spacing="6">
				<Stack spacing="5">
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input id="email" type="email" value={loginInputs.email} name='email' onChange={handleChange}/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input id="password" type="password" value={loginInputs.password} name='password' onChange={handleChange}/>
					</FormControl>
				</Stack>
				<Stack spacing="6">
					<Button variant={"solid"} color={'whiteAlpha.900'} bg={'purple.400'} fontWeight={'normal'} fontSize={'xl'} _hover={{bg: 'purple.300'}} onClick={onSubmit} disabled={isFetching}>
						Sign in
					</Button>
					<Divider borderBottomWidth={2} borderBottomColor={'purple.300'} />
					<HStack spacing="1" justify="center">
						<Text color="muted">Don't have an account?</Text>
						<Button as={Link} to={'/signup'}  variant="link" colorScheme="purple">Sign up</Button>
					</HStack>
					<Button onClick={handleGuestLogin} variant="link" colorScheme="gray">Guest Login</Button>
				</Stack>
			</Stack>
		</Box>
		</Stack>
	</Container>
    )
}

export default Login