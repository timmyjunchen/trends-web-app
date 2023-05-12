import { Button, HStack, Input, Textarea, VStack, Image, Divider, Heading } from "@chakra-ui/react"
import { FormEventHandler, useEffect, useState } from "react"
import { Person, Task } from "../../types"
import { addDoc, collection } from "firebase/firestore"
import { db, signInWithGoogle, createUserWithPassword, signInWithPassword, signOut } from "../../util/firebase"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "../auth/AuthUserProvider"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"


const LoginAddControl = () => {
  const [usernameInputLogIn, setUsernameInputLogIn] = useState("")
  const [passwordInputLogIn, setPasswordInputLogIn] = useState("")
  const [usernameInputSignUp, setUsernameInputSignUp] = useState("")
  const [passwordInputSignUp, setPasswordInputSignUp] = useState("")

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
        <Input /**Password */
          value={passwordInputSignUp}
          type="text"
          placeholder="Password"
          onChange={(e) => setPasswordInputSignUp(e.target.value)}
        />
      </VStack>
      <HStack>
        <Button onClick={signUpPassword}>Sign Up</Button>
        <Button type="submit">Forgot Password</Button>
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
        <Input /**Password */
          value={passwordInputLogIn}
          type="text"
          placeholder="Password"
          onChange={(e) => setPasswordInputLogIn(e.target.value)}
        />
      </VStack>
      <HStack>
        <Button onClick={logInPassword}>Login</Button>
        <Button type="submit">Forgot Password</Button>
      </HStack>
      <Button onClick={signInWithGoogle} variant="outline" leftIcon={<FcGoogle />}>Log In With Google</Button>;
    </VStack >
  }

  const profilePage = () => {
    return <Button onClick={signOut}>
      Log Out
    </Button>
  }

  return (
    <>
      {user !== undefined && user !== null ? profilePage() : signInPage()}
    </>
  )
}

export default LoginAddControl

