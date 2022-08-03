import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { deleteArchive, deleteNoteFromTrash } from '../redux';
import { useDispatch } from "react-redux";

const AlertDialogBox = ({isOpen,onClose,type,deleteId}) => {
    const cancelRef = useRef();
    const toast = useToast();
    const dispatch = useDispatch();
    const deleteFn = () => {
        if(type === 'archive')dispatch(deleteArchive({noteId:deleteId,toast})); 
        if(type === 'note')dispatch(deleteNoteFromTrash({noteId:deleteId,toast}));
        onClose();
    }
    return (
        <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
          <AlertDialogOverlay />  
          <AlertDialogContent>
            <AlertDialogHeader>Delete Confirmation</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to discard this {type === 'archive'? 'archive' : 'note' } permanently?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={deleteFn} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogBox;