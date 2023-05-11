import { Heading, Spinner, VStack } from "@chakra-ui/react"
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
    width="700px"
    bgGradient="linear(to-r, blue.700, green.500)"
    bgClip="text"
    lineHeight={1.33}
  >
    Cornell Lost and Found
  </Heading>
)

const LostHeading = () => (
  <Heading
    as="h3"
    w="fit-content"
    size="xl"
    bgGradient="linear(to-r, blue.700, green.500)"
    bgClip="text"
    lineHeight={1.33}
  >
    Login
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
    <VStack spacing={10} align="stretch" maxWidth="100%">
      <Title />
      <LostHeading />
      <LoginAddControl /> // TODO?: where textboxes are
    </VStack>
  )
}

export default Login
