import { Button, HStack, Input } from "@chakra-ui/react"
import { FormEventHandler, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../util/firebase"

const TaskAddControl = () => {
  const [input, setInput] = useState("")

  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (input === "") return

    const task: Task = {
      text: input,
      checked: false,
    }

    addDoc(collection(db, "tasks"), task)
    setInput("")
  }

  return (
    <form onSubmit={addPost}>
      <HStack shouldWrapChildren>
        <Input /**item title */
          value={input}
          type="text"
          placeholder="Item title*"
          onChange={(e) => setInput(e.target.value)}
        />
        <Input /**item description */
          value={input}
          type="text"
          placeholder="Item description* (be as specific as possible)"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Add Post</Button>
      </HStack>
    </form>
  )
}

export default TaskAddControl
