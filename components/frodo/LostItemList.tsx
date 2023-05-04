import { Text, VStack } from "@chakra-ui/react"
import { TaskWithId } from "../../types"
import TaskItem from "./TaskItem"

type Props = {
  readonly tasks: TaskWithId[]
}

const LostItemList = ({ tasks }: Props) => {
  return (
    <VStack>
      {tasks.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <Text>You have lost no items 🤩</Text>
      )}
    </VStack>
  )
}

export default LostItemList
