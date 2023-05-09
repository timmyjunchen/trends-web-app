import { DeleteIcon } from "@chakra-ui/icons"
import { Checkbox, HStack, IconButton, Text, Image } from "@chakra-ui/react"
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { TaskWithId } from "../../types"
import { db, storage } from "../../util/firebase"

type Props = {
  readonly task: TaskWithId
}

const TaskItem = ({ task: { id, text, lost, image, checked } }: Props) => { //TODO: CHANGE TO POST
  const toggleTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    updateDoc(taskDoc, { lost: !lost })//TODO: change to found: !found ?
  }

  const deleteTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    deleteDoc(taskDoc)
  }

  // const uploadImg = () => {
  //   // const taskDoc = doc(collection(db, "tasks"), id)
  //   return getDownloadURL(ref(storage, image))
  // }

  return (
    <HStack w="100%">
      <Checkbox isChecked={checked} onChange={toggleTask} />
      <Text textDecorationLine={checked ? "line-through" : "initial"}>
        {text}
      </Text>
      <Image src= {getDownloadURL(ref(storage, image))} />
      <IconButton
        aria-label="claim item"
        size="xs"
        variant="ghost"
        colorScheme="red"
        icon={<DeleteIcon />} //TODO
        onClick={deleteTask} //TODO
      />
    </HStack>
  )
}

export default TaskItem
