import { DeleteIcon } from "@chakra-ui/icons"
import { Checkbox, HStack, IconButton, Text } from "@chakra-ui/react"
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { TaskWithId } from "../../types"
import { db } from "../../util/firebase"

type Props = {
  readonly task: TaskWithId
}

const TaskItem = ({ task: { id, text, checked } }: Props) => { //TODO: CHANGE TO POST
  const toggleTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    updateDoc(taskDoc, { checked: !checked })//TODO: change to found: !found ?
  }

  const deleteTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    deleteDoc(taskDoc)
  }

  return (
    <HStack w="100%">
      <Checkbox isChecked={checked} onChange={toggleTask} />
      <Text textDecorationLine={checked ? "line-through" : "initial"}>
        {text}
      </Text>
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
