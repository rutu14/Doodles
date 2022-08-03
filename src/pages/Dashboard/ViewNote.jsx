import { Box, Button, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton,PopoverContent, PopoverTrigger, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DeleteNavbarIcon, InfoIcon, OptionsCloseIcon, OptionsOpenIcon, UpdateNavbarIcon } from "../../assest/icon";
import { addtoTrash, getTags, tagSelector } from "../../redux";

const ViewNote = () => {
    const toast = useToast();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [actions, setActions] = useState(false);

    useEffect(() => {
        dispatch(getTags(toast));
    },[]);
    
    const { noteDetail } = location.state;
    const { tags } = useSelector( tagSelector );

    const date = new Date(noteDetail.createdDate);
    const createdDate = date.toLocaleString('en-IN',{weekday: 'long',year: 'numeric', month: 'long', day: 'numeric' });
    const displayActions = () => setActions(!actions);
    const showEdit = () => navigate('/edit',{state:{noteDetail}});
    const deleteNote = () => { 
        dispatch(addtoTrash({noteId: noteDetail._id,toast}));
        navigate('/dashboard');
    };

    const displayTag = (tagPresent) => {
        const colorIndex = tags.findIndex( tag => tagPresent === tag.tagName );
        if( colorIndex !== -1 ) return tags[colorIndex].color;
    }

    const lineBreaks = (data) => {
        return data.split('\n').reduce(function (arr,line) {
            return arr.concat(
            <p>
              {line}
              <br />
              </p>
            );
        },[]);
    }


    return (
        <Box p={'20px'}>
            <Popover>
                <PopoverTrigger>                                    
                    <InfoIcon pos={'absolute'} color={'#171618ad'} fontSize={'30px'}/>
                </PopoverTrigger>
                <PopoverContent  maxW={'255px'}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Text>Date: {createdDate}</Text>
                        Tags: 
                        {noteDetail.tags.map( tag =>
                            <Box as="span" key={tag} height={'fit-content'} fontSize={'12px'}  m={'5px'} p={'5px'} borderRadius={'5px'} color={'#f8edd8'} bg={displayTag(tag)}>{tag}</Box>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            {actions ?  
                <Flex transition={'display 0.3s ease-in'} pos={'absolute'} right={'10px'} width={'fit-content'} alignItems={'center'}>
                    <IconButton margin={'9px'} onClick={displayActions} fontSize={'30px'} color={'#171618ad'} icon={<OptionsCloseIcon/>}></IconButton>
                    <Flex direction={'column'}>
                        <Button variant={'outline'} bg={'#fff'} borderColor={'#9b9bfe'} color={'#9b9bfe'} _hover={{bg:'#a1a1e2',color:'black'}} leftIcon={<UpdateNavbarIcon/>} borderRadius={'4px'} fontSize={'14px'} lineHeight={'36px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} mb={'10px'} onClick={showEdit}>
                            Update Note
                        </Button>
                        <Button variant={'outline'} bg={'#fff'} borderColor={'#9b9bfe'} color={'#9b9bfe'}
                        _hover={{bg:'#a1a1e2',color:'black'}} leftIcon={<DeleteNavbarIcon/>} borderRadius={'4px'} fontSize={'14px'} lineHeight={'36px'} fontWeight={'medium'} letterSpacing={'.0892857143em'} textTransform={'uppercase'} p={'0 8px'} onClick={deleteNote} >
                            Delete Note
                        </Button>
                    </Flex>
                </Flex>
            :
                <IconButton transition={'all 0.3s ease-in'} onClick={displayActions} pos={'absolute'} right={'10px'} fontSize={'30px'} color={'#171618ad'} icon={<OptionsOpenIcon/>}></IconButton>
            }
            <Box as={'section'} boxSizing={'border-box'} p={'20px 40px'} boxShadow={'#00000026 2.4px 2.4px 3.2px'} borderRadius={'10px'} width={'60%'} margin={'auto'} bg={noteDetail.color !== 'default' ?`${noteDetail.color}.100`:'purple.100'}>
               <Heading fontSize={'24px'} lineHeight={'32px'} fontWeight={'normal'} textAlign={'center'}>{noteDetail.title} </Heading> 
            </Box>
            <Box as={'section'} p={'40px'} boxShadow={'#00000026 2.4px 2.4px 3.2px'} borderRadius={'10px'} width={'95%'} m={'30px auto'} bg={noteDetail.color !== 'default' ?`${noteDetail.color}.100`:'purple.100'}>
                <p>
                {lineBreaks(noteDetail.content)}
                </p>
            </Box>
        </Box>
        
    )
}

export default ViewNote;