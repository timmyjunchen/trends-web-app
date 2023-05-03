import { DeleteIcon } from "@chakra-ui/icons"
import { Checkbox, HStack, IconButton, Text } from "@chakra-ui/react"
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { TaskWithId } from "../../types"
import { db } from "../../util/firebase"

type Props = {
  readonly task: TaskWithId
}

const TaskItem = ({ task: { id, text, checked } }: Props) => {
  const toggleTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    updateDoc(taskDoc, { checked: !checked })
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
        aria-label="delete task"
        size="xs"
        variant="ghost"
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={deleteTask}
      />
    </HStack>
  )
}

export default TaskItem
