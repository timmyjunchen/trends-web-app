import { Button, HStack, Input, Textarea, VStack, Image } from "@chakra-ui/react"
import { FormEventHandler, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection} from "firebase/firestore"
import { db } from "../../util/firebase"
import { isEmpty } from "@firebase/util"

const TaskAddControl = () => {
  const [titleInput, setTitleInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [imgInput, setImgInput] = useState<File>()

  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (titleInput === "" || dateInput === "" || locationInput === "" || descriptionInput === "" || imgInput === null) return

    const task: Task = {
      text: titleInput,
      checked: false,
    }

    setImgInput(undefined) //change? how does actually clear/reset...
    addDoc(collection(db, "tasks"), task)
    setTitleInput("")
    setDateInput("")
    setLocationInput("")
    setDescriptionInput("")
  }

  return (
    <form onSubmit={addPost}>
      <VStack align="stretch">
        <HStack align="stretch">
          <VStack align="stretch">
            <Input /**item title */
              value={titleInput}
              type="text"
              placeholder="Item title*"
              onChange={(e) => setTitleInput(e.target.value)}//change this so j onsubmit
            />
            <Input /**date */
              value={dateInput}
              type="datetime-local"
              placeholder="MM/DD/YYYY"
              onChange={(e) => setDateInput(e.target.value)}
            />
            <Input /**item location */
              value={locationInput}
              type="text"
              placeholder="Location found*"
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </VStack>
          <Textarea /**item description */
            value={descriptionInput}
            placeholder="Item description* (be as specific as possible)"
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </HStack>
        <Input  /**item img */
          // value={imgInput}
          type="file"
          accept="image/*"
          placeholder="Upload Image Here"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
            setImgInput(e.target.files[0])//change through useeffect and add that var as a dependency- keep track of file and when file becomes undefined 
          }
          else{
            setImgInput(undefined)
          }
            
          }} //TODO: change to button + incorporate add img?- files = array of file objs
          /> 
        <Button type="submit">Add Post</Button>
      </VStack>
    </form>
  )
}

export default TaskAddControl

