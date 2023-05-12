import { Center, Divider, Heading, HStack, Spinner, VStack } from "@chakra-ui/react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Task, TaskWithId } from "../../types"
import TaskAddControl from "./TaskAddControl"
import TaskList from "./TaskList"
import { db } from "../../util/firebase"
import LostItemAddControl from "./LostItemAddControl"
import LostItemList from "./LostItemList"
import LoginAddControl from "./LoginAddControl"

const Title = () => (
  <Heading
    as="h1"
    w="fit-content"
    size="2xl"
    width="100%"
    bgGradient="linear(to-r, blue.700, green.500)"
    bgClip="text"
    lineHeight={1.33}
  >
    <Center>
      Cornell Lost and Found
    </Center>
  </Heading>
)


const taskQuery = query(collection(db, "tasks"))

const Login = () => {
  const [tasks, setTasks] = useState<TaskWithId[] | null>(null)

  // Subscribes to `taskQuery`
  // We define a function to run whenever the query result changes
  useEffect(() => {
    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {

    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const snapshot = onSnapshot(taskQuery, (querySnapshot) => {
      const snapshotTasks: TaskWithId[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Task
        return { ...data, id: doc.id }
      })
      setTasks(snapshotTasks)
    })
    return snapshot
  }, [])

  return (
    <VStack align="stretch" width="100%">
      <Title />
      <LoginAddControl />
    </VStack>
  )
}

export default Login
