import { Box,Heading,Container,Text,Button,Stack} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <Container maxW={'3xl'}>
            <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
                <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
                    Pen down your <></>
                    <Text as={'span'} color={'purple.400'}>thoughts</Text>
                </Heading>
                <Text fontSize={'2xl'} color={'gray.500'}>
                    Inspiration strikes anywhere. Create organized and creative notes anytime, anywhere.
                    Effortless, Organised & Share.
                </Text>
                <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
                    <Button as={Link} to={'/login'} size='lg' fontSize={'md'} colorScheme={'purple'} bg={'purple.400'} rounded={'full'} px={6} _hover={{bg: 'purple.500',}}>
                        Get Started
                    </Button>
                </Stack>
            </Stack>
      </Container>
    );
}

export default Home;