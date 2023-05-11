import { Button, HStack, Input, Textarea, VStack, Image } from "@chakra-ui/react"
import { FormEventHandler, useEffect, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection } from "firebase/firestore"
import { db, signInWithGoogle } from "../../util/firebase"
import { isEmpty } from "@firebase/util"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "../auth/AuthUserProvider"


const LoginAddControl = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  let { user } = useAuth()
  const updateUser = () => {
    let { user } = useAuth()
    return user
  }

  let signedIn = false

  updateUser()
  useEffect(
    () => {
      if (user !== null || user !== undefined) {
        signedIn = true
      }
    }, []
  )

  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (usernameInput === "" || passwordInput === "") return

    const task: Task = { //CHANGE TO ACCOUNT TYPE
      email: user!.email,
      text: usernameInput + passwordInput,
      lost: false, //TODO: Fix later lol
      image: null,
      checked: false,
    }

    addDoc(collection(db, "tasks"), task)
  }

  const signIn = () => {
    user = updateUser();
    return signInWithGoogle
  }

  const signInPage = () => {
    return <VStack align="stretch">
      <VStack align="stretch">
        <Input /**Username */
          value={usernameInput}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <Input /**Password */
          value={passwordInput}
          type="text"
          placeholder="Password"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </VStack>
      <HStack>
        <form onSubmit={addPost}>
          <Button type="submit">Login</Button>
        </form>
        <Button type="submit">Forgot Password</Button>
      </HStack>
      <Button onClick={signIn()} variant="outline" leftIcon={<FcGoogle />}>Sign In With Google</Button>;
    </VStack >
  }

  const profilePage = () => {
    return <h1>
      test
    </h1>
  }

  return (
    <h1>
      {signedIn ? profilePage() : signInPage()}
    </h1>
  )
}

export default LoginAddControl

