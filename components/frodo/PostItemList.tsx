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
        <Text>There are no posts</Text>
      )}
    </VStack>
  )
}

export default LostItemList
