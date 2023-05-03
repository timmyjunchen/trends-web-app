import { Text, VStack } from "@chakra-ui/react"
import { TaskWithId } from "../../types"
import TaskItem from "./TaskItem"

type Props = {
  readonly tasks: TaskWithId[]
}

const TaskList = ({ tasks }: Props) => {
  return (
    <VStack>
      {tasks.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <Text>You have no current postings.</Text>
      )}
    </VStack>
  )
}

export default TaskList
