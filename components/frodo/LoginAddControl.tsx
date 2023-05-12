import { Button, HStack, Input, Textarea, VStack, Image } from "@chakra-ui/react"
import { FormEventHandler, useEffect, useState } from "react"
import { Person, Task } from "../../types"
import { addDoc, collection } from "firebase/firestore"
import { db, signInWithGoogle, signOut } from "../../util/firebase"
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

  let signedIn = user !== null && user !== undefined

  useEffect(
    () => {
      if (user !== null && user !== undefined) {
        signedIn = true
      }
    }, []
  )

  const addUser: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (usernameInput === "" || passwordInput === "") return

    const person: Person = { //CHANGE TO ACCOUNT TYPE
      uid: "",
      username: usernameInput,
      password: passwordInput,
    }

    addDoc(collection(db, "users"), person)
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
        <form onSubmit={addUser}>
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
    // <Button>
    //   onClick= {signOut()} dwaabd
    // </Button>
  }

  return (
    <>
      {signedIn ? profilePage() : signInPage()}
    </>
  )
}

export default LoginAddControl

