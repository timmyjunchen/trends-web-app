import { Button, HStack, Input, Textarea, VStack, Image, Divider, Heading, Spinner, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FormEventHandler, useEffect, useState } from "react"
import { Person, Task, TaskWithId } from "../../types"
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"
import { db, signInWithGoogle, createUserWithPassword, signInWithPassword, signOut } from "../../util/firebase"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "../auth/AuthUserProvider"
import LostItemList from "./LostItemList"
import PostItemList from "./PostItemList"


const LoginAddControl = () => {

  const [usernameInputLogIn, setUsernameInputLogIn] = useState("")
  const [passwordInputLogIn, setPasswordInputLogIn] = useState("")
  const [usernameInputSignUp, setUsernameInputSignUp] = useState("")
  const [passwordInputSignUp, setPasswordInputSignUp] = useState("")

  const [showLogIn, setShowLogIn] = useState(false)
  const handleClickLogIn = () => setShowLogIn(!showLogIn)

  const [showSignUp, setShowSignUp] = useState(false)
  const handleClickSignUp = () => setShowSignUp(!showSignUp)

  let { user } = useAuth()

  const signUpPassword = () => {
    if (usernameInputSignUp === "" || passwordInputSignUp === "") return;
    createUserWithPassword(usernameInputSignUp, passwordInputSignUp)
  }

  const logInPassword = () => {
    if (usernameInputLogIn === "" || passwordInputLogIn === "") return;
    signInWithPassword(usernameInputLogIn, passwordInputLogIn)
  }

  const signInPage = () => {
    return <HStack align="stretch" width="100%" height="500px" spacing={10}>
      <VStack spacing={10} align="stretch" width="100%">
        <Heading
          as="h3"
          w="fit-content"
          size="xl"
          bgGradient="linear(to-r, blue.700, green.500)"
          bgClip="text"
          lineHeight={1.33}
        >
          Log in
        </Heading>
        {logInBoxes()} // TODO?: where textboxes are
      </VStack>
      <Divider orientation="vertical" />
      <VStack spacing={10} align="stretch" width="100%">
        <Heading
          as="h3"
          w="fit-content"
          size="xl"
          bgGradient="linear(to-r, blue.700, green.500)"
          bgClip="text"
          lineHeight={1.33}
        >
          Sign up
        </Heading>
        {signUpBoxes()} // TODO?: where textboxes are
      </VStack>
    </HStack>
  }

  const signUpBoxes = () => {
    return <VStack align="stretch">
      <VStack align="stretch">
        <Input /**Username */
          value={usernameInputSignUp}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsernameInputSignUp(e.target.value)}
        />
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={showSignUp ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setPasswordInputSignUp(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClickSignUp}>
              {showSignUp ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
      <HStack>
        <Button onClick={signUpPassword}>Sign Up</Button>
        {//<Button type="submit">Forgot Password</Button>
        }
      </HStack>
      <Button onClick={signInWithGoogle} variant="outline" leftIcon={<FcGoogle />}>Sign Up With Google</Button>;
    </VStack >
  }

  const logInBoxes = () => {
    return <VStack align="stretch">
      <VStack align="stretch">
        <Input /**Username */
          value={usernameInputLogIn}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsernameInputLogIn(e.target.value)}
        />
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={showLogIn ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setPasswordInputLogIn(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClickLogIn}>
              {showLogIn ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
      <HStack>
        <Button onClick={logInPassword}>Login</Button>
        {//<Button type="submit">Forgot Password</Button>
        }
      </HStack>
      <Button onClick={signInWithGoogle} variant="outline" leftIcon={<FcGoogle />}>Log In With Google</Button>;
    </VStack >
  }

  const taskQuery = user !== undefined && user !== null ? query(
    collection(db, 'tasks'),
    where('owner', '==', user!.uid)
  ) : query(
    collection(db, 'tasks')
  )

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

  const profilePage = () => {
    return <VStack>
      <Heading
        as="h3"
        w="fit-content"
        size="xl"
        bgGradient="linear(to-r, blue.700, green.500)"
        bgClip="text"
        lineHeight={1.33}
      >
        Here are your posts!
      </Heading>
      <Button onClick={signOut}>
        Log Out
      </Button>
      <VStack spacing={4} align="stretch">
        {tasks ? <PostItemList tasks={tasks} /> : <Spinner />}
      </VStack>
    </VStack>
  }

  return (
    <>
      {user !== undefined && user !== null ? profilePage() : signInPage()}
    </>
  )
}

export default LoginAddControl

