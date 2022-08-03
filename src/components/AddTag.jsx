import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton,  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createaTag } from "../redux";

const AddTag = ({isOpen,onClose}) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const initialState = {tagName:'', color:'tags.100'};
    const [ tagInputs, setTagInputs ] = useState(initialState);

    const onSubmit = () => {
		if( tagInputs.tagName === "" ){
            toast({
                title: "Provide a title",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else{
            const createParameter = {tag:tagInputs,toast};
			dispatch(createaTag(createParameter));
            setTagInputs(initialState);
            onClose();
        }
	};
    const handleChange = e => {
		const { name, value } = e.target;
		setTagInputs(prevState => ({
			...prevState,
			[name] : value.trim()
		}));
	};

    const handleChangeRadiobox = e => {
        setTagInputs(prevState => ({
			...prevState,
			'color': e
		}));
    };

    return(
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay py={'5'}  />
        <ModalContent maxW={'2xl'} bg={'#eaeafc'}>
          <ModalHeader fontSize={'2xl'} color={'red.300'} fontFamily={'monospace'} fontWeight={'light'} textAlign={'center'}>Create Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
          <Stack spacing="8">
          <Stack spacing="5" alignItems={'center'}>
					<FormControl isRequired>
                        <HStack>
                        <FormLabel fontSize={'22px'} lineHeight={'32px'} fontWeight={'light'}  htmlFor="title">Title</FormLabel>
						<Input value={tagInputs.tagName} onChange={handleChange} name='tagName' borderColor={'#00000047'} bg={'#f6f8ffc7'} _focus={{bg:'#f6f8ff'}} id="title" type="text" size={'md'}/>
                        </HStack>						
					</FormControl>
                        <RadioGroup colorScheme={'purple'} onChange={handleChangeRadiobox} defaultValue='tags.100'>
                            <Stack spacing={4} direction='row'>
                                <Radio bg={'#ffffff'} borderWidth={'thin'} borderColor={'#00000047'} value='tags.100'>
                                    <Flex alignItems={'center'}> Default <Box borderRadius={'2px'} w={'15px'} h={'15px'} bg={'tags.100'} ml={'5px'}/></Flex>
                                </Radio>
                                <Radio bg={'#ffffff'} borderWidth={'thin'} borderColor={'#00000047'} value='tags.200'>
                                    <Flex alignItems={'center'}> Color 1 <Box borderRadius={'2px'} w={'15px'} h={'15px'} bg={'tags.200'} ml={'5px'}/></Flex>
                                </Radio>
                                <Radio bg={'#ffffff'} borderWidth={'thin'} borderColor={'#00000047'} value='tags.300'>
                                    <Flex alignItems={'center'}> Color 2 <Box borderRadius={'2px'} w={'15px'} h={'15px'} bg={'tags.300'} ml={'5px'}/></Flex>
                                </Radio>
                            </Stack>
                        </RadioGroup>
				</Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={'red'} mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme='purple' onClick={onSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default AddTag;