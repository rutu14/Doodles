import { Button,Box, Flex,Grid,GridItem, Spinner,Center,Heading} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllNotes, noteSelector } from "../../redux/notes";
import { getTags, tagSelector } from "../../redux/tag";

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNotes());
        dispatch(getTags());
    },[]);

    const { notes, isFetching } = useSelector( noteSelector );
    const { tags } = useSelector( tagSelector );

    const displayLabel = (tagPresent) => {
        const colorIndex = tags.findIndex( tag => tagPresent === tag.tagName );
        if( colorIndex !== -1 ) return tags[colorIndex].color;
    }

    return(<Box>
        <Flex p={'5px 40px'} alignItems={'center'} justifyContent={'flex-end'}>
            <Button variant={'link'} fontFamily={'montserrat'} fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
                <i className="bi bi-funnel"></i>Filter
            </Button>
            <Button variant={'link'} fontFamily={'montserrat'} fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}}>
            <i className="bi bi-sort-down"></i>Sort
            </Button>
        </Flex>
        <Flex p={'0 60px 40px'} alignItems={'center'} direction={'column'}>
            { isFetching && <Center><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' size='xl'/></Center>}
            {!isFetching && notes.length === 0 ? <Heading fontWeight={'medium'} color={'gray.600'}>Add Notes</Heading>
            : notes && notes.map((noteDetail) => {
                return(<Box key={noteDetail._id} as={Grid} w={'100%'} h={'68px'} alignItems={'center'} gridTemplateColumns={'40%  20% 20% 20%'} gap={'20px'} m={'10px 0'} bg={noteDetail.color !== 'default' ?`${noteDetail.color}.100`:'#ccccff75'} fontSize={'14px'} lineHeight={'33px'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} boxShadow={"0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)"} borderRadius={'4px'} cursor={'pointer'} >
                <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'} fontWeight={'medium'} fontSize={'20px'} lineHeight={'32px'} _hover={{color:'#070707', textDecoration:'none'}}>
                    {noteDetail.title}
                </GridItem>
                <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'}>
                    {noteDetail.tags && noteDetail.tags.map( tag => {
                        return(
                        <Box as="span" key={noteDetail.tags} height={'fit-content'} fontSize={'12px'} m={'5px'} p={'5px'} borderRadius={'5px'} color={'#f8edd8'} bg={displayLabel(tag)}>{tag}</Box>
                        )
                    })
                    }
                </GridItem>
                <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'} fontWeight={'bold'} fontSize={'16px'} lineHeight={'24px'} textAlign={'center'}>
                    -
                </GridItem>
                <GridItem p={'16px'} fontSize={'16px'} lineHeight={'24px'}>
                {noteDetail.createdDate}
                </GridItem>
            </Box>)
            })}
        </Flex>
        </Box>
    )
}

export default Dashboard;