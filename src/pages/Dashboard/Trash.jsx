import { Box, Center, CircularProgress, Flex, Grid, GridItem, Heading, IconButton, Popover, PopoverArrow,PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tooltip, useDisclosure,useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { tagSelector, noteSelector, getTrash, restorefromTrash  } from "../../redux";
import { DeleteActionIcon, RestoreDeleteIcon } from "../../assest/icon";
import { AlertDialogBox } from "../../components";

const Trash = () => {
    const toast = useToast();
    const dispatch = useDispatch();   
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        dispatch(getTrash(toast));
    },[]);

    const { trash,isTrashFetching } = useSelector( noteSelector );
    const { tags } = useSelector( tagSelector );

    const restoreTrashNote = (noteId) => dispatch(restorefromTrash({noteId,toast}));
    const deleteTrashNote = () => onOpen(); 

    const displayTag = (tagPresent) => {
        const colorIndex = tags.findIndex( tag => tagPresent === tag.tagName );
        if( colorIndex !== -1 ) return tags[colorIndex].color;
    }
    
    return(
        <Box minH={'calc(100vh - 124px)'}>
        { isTrashFetching ? 
            <Center minH={'inherit'}>
                <Flex padding={'5'} borderRadius={'xl'} bg={'rgba(63, 57, 57, 0.2)'} backdropFilter={'blur(2px)'} boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'} >
                    <CircularProgress isIndeterminate color='purple.300' thickness={'10px'} size={'90px'} />
                </Flex>
            </Center>
        :
            trash.length === 0 ? 
                <Box>
                    <Center><Heading mt={'20'} fontSize={'3xl'} fontWeight={'medium'}  color={'gray.600'}>
                        Trash Bin
                    </Heading></Center>
                </Box> 
                : 
                <>
                <Box>                
                    <Heading p={'30px 40px'} fontSize={'3xl'} fontWeight={'medium'} color={'gray.600'} textAlign={'center'}>Trash</Heading>
                    <Flex p={'0 60px 40px'} alignItems={'center'} direction={'column'}>
                    {trash && trash.map( (noteDetail) => {
                        return(
                        <Box key={noteDetail._id} as={Grid} w={'100%'} h={'68px'} alignItems={'center'} gridTemplateColumns={'40%  20% 20% 14%'} gap={'20px'} m={'10px 0'} bg={noteDetail.color !== 'default' ?`${noteDetail.color}.100`:'#ccccff75'} fontSize={'14px'} lineHeight={'33px'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} color={'#808080'} boxShadow={"0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)"} borderRadius={'4px'} cursor={'pointer'} >                    
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
                            <GridItem p={'16px'} fontSize={'16px'} lineHeight={'24px'}>
                                {noteDetail.createdDate}
                            </GridItem>
                            <GridItem p={'16px'} fontSize={'16px'} lineHeight={'24px'}>
                            <Flex justifyContent={'space-evenly'}>
                                <Tooltip label={'Delete the note'}>
                                    <IconButton onClick={()=>deleteTrashNote()} bg={'red.300'} fontSize={'xl'} icon={<DeleteActionIcon/>}/>
                                </Tooltip>
                                <Tooltip label={'Restore the note'}>
                                    <IconButton onClick={()=>restoreTrashNote(noteDetail._id)} bg={'purple.200'} fontSize={'xl'} icon={<RestoreDeleteIcon/>}/>
                                </Tooltip>                            
                            </Flex>
                        </GridItem>
                        <AlertDialogBox isOpen={isOpen} onClose={onClose} type={'note'}  deleteId={noteDetail._id}/>
                        </Box>)
                    })}
                    </Flex> 
                </Box>
                </>
        }
        </Box>
      )
}

export default Trash;