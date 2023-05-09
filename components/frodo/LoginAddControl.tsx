import { Button, HStack, Input, Textarea, VStack, Image } from "@chakra-ui/react"
import { FormEventHandler, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../util/firebase"
import { isEmpty } from "@firebase/util"

const LoginAddControl = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")


  
  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (usernameInput === "" || passwordInput === "") return

    const task: Task = { //CHANGE TO ACCOUNT TYPE
      text: usernameInput + passwordInput,
      lost: false, //TODO: Fix later lol
      image: '', //undefined
      checked: false,
    }

    addDoc(collection(db, "tasks"), task)
  }

  return (
    <form onSubmit={addPost}>
      <VStack align="stretch">
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
          <Button type="submit">Login</Button>
          <Button type="submit">Forgot Password</Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default LoginAddControl

