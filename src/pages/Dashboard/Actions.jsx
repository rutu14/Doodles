import { Box, Button, Center, CircularProgress, Flex, Grid, GridItem, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tooltip,useToast} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, noteSelector, addtoTrash, addToArchive, getTags, tagSelector } from "../../redux";
import { ArchiveActionIcon, DeleteActionIcon, FilterFunnelIcon, PenActionIcon, SortIcon } from "../../assest/icon";

const Actions = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNotes(toast));
        dispatch(getTags(toast));
    },[]);

    const showEdit = (data) => navigate('/edit',{state:{noteDetail:data}});
    const deleteNote = (noteId) => { dispatch(addtoTrash({noteId,toast})); };
    const archiveNote = (noteId) => { dispatch(addToArchive({noteId,toast})); };

    const { notes, isGetNotesFetching } = useSelector( noteSelector );
    const { tags } = useSelector( tagSelector );

    const displayTag = (tagPresent) => {
        const colorIndex = tags.findIndex( tag => tagPresent === tag.tagName );
        if( colorIndex !== -1 ) return tags[colorIndex].color;
    }

    return(
    <Box>
        <Flex p={'5px 40px'} alignItems={'center'} justifyContent={'flex-end'}>
            <Button variant={'link'} fontFamily={'montserrat'} fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}} leftIcon={<FilterFunnelIcon/>}>
                Filter
            </Button>
            <Button variant={'link'} fontFamily={'montserrat'} fontSize={'14px'} lineHeight={'33px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} _hover={{color:'#070707', textDecoration:'none'}} leftIcon={<SortIcon/>}>
                Sort
            </Button>
        </Flex>
        <Flex p={'0 60px 40px'} alignItems={'center'} direction={'column'}>
            { isGetNotesFetching ?
                <Center minH={'calc(100vh - 64px)'}>
                   <Flex padding={'5'} borderRadius={'xl'} bg={'rgba(63, 57, 57, 0.2)'} backdropFilter={'blur(2px)'} boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'} >
                       <CircularProgress isIndeterminate color='purple.300' thickness={'10px'} size={'90px'} />
                   </Flex>
               </Center>
            : notes.length === 0 ? 
                <Heading fontWeight={'medium'} color={'gray.600'}>Add Notes</Heading>
                : notes && notes.map((noteDetail) => {
                    return(
                    <Box key={noteDetail._id}  as={Grid} w={'100%'} h={'68px'} alignItems={'center'} gridTemplateColumns={'40% 20% 15% 20%'} gap={'20px'} m={'10px 0'} bg={noteDetail.color !== 'default' ?`${noteDetail.color}.100`:'#ccccff75'} fontSize={'14px'} lineHeight={'33px'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} boxShadow={"0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)"} borderRadius={'4px'} cursor={'pointer'} >
                    <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'} fontWeight={'medium'} fontSize={'20px'} lineHeight={'32px'} _hover={{color:'#070707', textDecoration:'none'}}>
                        {noteDetail.title}
                    </GridItem>
                    { noteDetail.tags ?
                            <Popover>
                                <PopoverTrigger> 
                                    <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'}>
                                        {noteDetail.tags && noteDetail.tags.map( tag => {
                                            return(
                                            <Box as="span" key={noteDetail.tags} height={'fit-content'} fontSize={'12px'} m={'5px'} p={'5px'} borderRadius={'5px'} color={'#f8edd8'} bg={displayTag(tag)}>{tag}</Box>
                                            )
                                        })}
                                    </GridItem>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Tags Added</PopoverHeader>
                                    <PopoverBody>
                                        {noteDetail.tags && noteDetail.tags.map( tag => {
                                            return(
                                            <Box as="span" key={noteDetail.tags} height={'fit-content'} fontSize={'12px'} m={'5px'} p={'5px'} borderRadius={'5px'} color={'#f8edd8'} bg={displayTag(tag)}>{tag}</Box>
                                            )
                                        })}
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        :''}
                    <GridItem p={'16px'} overflowX={'clip'} whiteSpace={'nowrap'} fontSize={'16px'} lineHeight={'24px'} textAlign={'center'}>
                        {noteDetail.createdDate}
                    </GridItem>
                    <GridItem p={'16px'} fontSize={'16px'} lineHeight={'24px'}>
                        <Flex justifyContent={'space-evenly'}>
                            <Tooltip label={'Edit the note'}>
                                <IconButton onClick={()=>showEdit(noteDetail)} bg={'orange.300'} fontSize={'xl'} icon={<PenActionIcon/>}/>
                            </Tooltip>
                            <Tooltip label={'Delete the note'}>
                                <IconButton onClick={()=>deleteNote(noteDetail._id)} bg={'red.300'} fontSize={'xl'} icon={<DeleteActionIcon/>}/>
                                </Tooltip>
                            <Tooltip label={'Archive the note'}>
                                <IconButton onClick={()=>archiveNote(noteDetail._id)} bg={'purple.300'} fontSize={'xl'} icon={<ArchiveActionIcon/>}/>
                            </Tooltip>
                        </Flex>
                    </GridItem>
                </Box>)
                })}
        </Flex>
        </Box>
    )
}

export default Actions;