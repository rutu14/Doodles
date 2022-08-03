import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, HStack, IconButton,Input, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editaNote, noteSelector, tagSelector } from "../../redux";
import { AddIcon } from "../../assest/icon";
import { capitializeString, colorOption } from "../../utils";
import { AddTag } from "../../components";

const EditNote = () => {    
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { noteDetail } = location.state;
    const initialState = {title:noteDetail.title,content:noteDetail.content,color:noteDetail.color,tags:noteDetail.tags,createdDate:noteDetail.createdDate,createdTime:noteDetail.createdTime,updatedDate:noteDetail.updatedDate,updatedTime:noteDetail.updatedTime}
    const [ noteInputs, setNoteInputs ] = useState(initialState);

    const { isCreateFetching } = useSelector( noteSelector );
    const { tags, isTagFetching } = useSelector( tagSelector );

    const handleKeyDown = (e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const onSubmit = () => {
		if( noteInputs.title === "" ){
            toast({
                title: "Provide a title",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( noteInputs.content === "" ){
            toast({
                title: "Start doodling!",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else{
            const createParameter = {noteId:noteDetail._id, note: noteInputs, toast};
			dispatch(editaNote(createParameter));
            navigate('/dashboard')
        }
	}
    const handleChange = e => {
		const { name, value } = e.target;
		setNoteInputs(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    const handleChangeCheckbox = e => {
        setNoteInputs(prevState => ({
			...prevState,
			'tags': e
		}));
    };

    return(
        <Box spacing="8" py={'10'} px={'20'}>
            <Stack spacing="5">
					<FormControl isRequired>
						<FormLabel fontSize={'22px'} lineHeight={'32px'} fontWeight={'light'}  htmlFor="title">Title</FormLabel>
						<Input value={noteInputs.title} onChange={handleChange} name='title' borderColor={'#00000047'} bg={'#f6f8ffc7'} _focus={{bg:'#f6f8ff'}} id="title" type="text" />
					</FormControl>
                    <HStack spacing={8} >
                        <FormControl w={'auto'}>
                            <FormLabel fontSize={'22px'} lineHeight={'32px'} fontWeight={'light'}  htmlFor="color">Color</FormLabel>
                            <Select w={'44'} value={noteInputs.color} onChange={handleChange} name='color' id="color" borderColor={'#00000047'} bg={noteInputs.color !== 'default' ?`${noteInputs.color}.100`:'whiteAlpha.300'} variant='outline' placeholder='Select a Color'>
                                {colorOption.map((color) => {
                                    return(<option key={color} value={color}>{capitializeString(color)}</option>);
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Flex>
                                <FormLabel fontSize={'22px'} lineHeight={'32px'} fontWeight={'light'}  htmlFor="tags" margin={'0'} py={'2px'}>Tags</FormLabel>
                                <IconButton onClick={onOpen} variant={'link'} fontSize={'25px'} color={'#7c1fd3'} icon={<AddIcon/>}></IconButton>
                            </Flex>                            
                            <CheckboxGroup defaultValue={noteInputs.tags} onChange={handleChangeCheckbox} name='label' id={'checkboxes'}colorScheme='purple'>
                        <Stack wrap={'wrap'} spacing={[1, 5]} direction={['column', 'row']}>
                            { isTagFetching && <Center className={"dot-typing"}></Center>}
                            {tags && tags.map((tagNumber) => {
                                return(<Checkbox key={tagNumber._id} borderColor={'#00000047'} value={tagNumber.tagName}>{tagNumber.tagName}</Checkbox>);
                            })}
                            {tags && tags.length === 0 && <Box>Add Tags</Box>}
                        </Stack>
                    </CheckboxGroup>
                        </FormControl>
                    </HStack>                    
                    <FormLabel fontSize={'22px'} lineHeight={'32px'} fontWeight={'light'} htmlFor='content'>Content</FormLabel>
                    <Textarea value={noteInputs.content} onChange={handleChange} name='content' borderColor={'#00000047'} bg={'#f6f8ffc7'} _focus={{bg:'#f6f8ff'}} id="content" type="text" onKeyDown={handleKeyDown} >
                    </Textarea>
				</Stack>
                <Flex w={'full'} mt={'5'} justifyContent={'center'}>
                    <Button disabled={isCreateFetching} textTransform={'uppercase'} colorScheme={'purple'}onClick={onSubmit} mr={10}> Update           
                    </Button>
                    <Button textTransform={'uppercase'} outline={'1px solid'} outlineColor={'purple.300'} ml={10} onClick={()=>navigate('/action')}> Cancel           
                    </Button>
                </Flex>
        <AddTag isOpen={isOpen} onClose={onClose}></AddTag>     
        </Box>
    )
}

export default EditNote;