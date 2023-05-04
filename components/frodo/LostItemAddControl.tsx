import { Button, HStack, Input, Textarea, VStack } from "@chakra-ui/react"
import { FormEventHandler, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection} from "firebase/firestore"
import { db } from "../../util/firebase"
import { isEmpty } from "@firebase/util"

const LostItemAddControl = () => {
  const [titleInput, setTitleInput] = useState("")//unique hooks
  const [dateInput, setDateInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [imgInput, setImgInput] = useState([])//need to change?

  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (titleInput === "" || dateInput === "" || locationInput === "" || descriptionInput === "" || imgInput === null) return

    const task: Task = {
      text: titleInput,
      checked: false,
    }

    addDoc(collection(db, "tasks"), task)
    setTitleInput("")
    setDateInput("")
    setLocationInput("")
    setDescriptionInput("")
    setImgInput([])
  }

  return (
    <form onSubmit={addPost}>
      <VStack align="stretch">
        <HStack align="stretch">
          <VStack align="stretch">
            <Input /**item title */
              value={titleInput}
              type="text"
              placeholder="Item title* EX. LOST Waterbottle"
              onChange={(e) => setTitleInput(e.target.value)}
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
              placeholder="Location Lost (if known)"
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
          value={imgInput}
          type="file"
          accept="image/*"
          placeholder="If you have an image of your item, upload it here."
          //onChange={(e) => setImgInput((e) => setImage(URL.createObjectURL(event.target.files[0]))} />
          //TODO: change to button + incorporate add img?- files = array of file objs
        />
        <Button type="submit">Add Post</Button>
      </VStack>
    </form>
  )
}

export default LostItemAddControl


