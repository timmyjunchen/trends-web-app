import { Button, HStack, Input, Textarea, VStack } from "@chakra-ui/react"
import { FormEventHandler, useState } from "react"
import { Task } from "../../types"
import { addDoc, collection} from "firebase/firestore"
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../util/firebase"
import { isEmpty } from "@firebase/util"

const TaskAddControl = () => {
  const [titleInput, setTitleInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [imgInput, setImgInput] = useState<File>()

  /** This number represents a signal. Whenever you increment the number, the input element will get refreshed */
  const [inputKey, setClearInput] = useState(1);
  const incrClear = () => setClearInput(inputKey+1);

  const addPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (titleInput === "" || dateInput === "" || locationInput === "" || descriptionInput === "" || imgInput === null) return


    // 1. upload to the `storage` object (check the documentation) -- guarantee you that the upload is a promise
    // and it'll resolve when the promise is done
    // chain step 2 below in a .then( and then put your code in here )

    /*import { getStorage, ref, uploadBytes } from "firebase/storage";

    const storage = getStorage();
    const storageRef = ref(storage, 'some-child');

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });*/
    
    const hash = (f : File | undefined) => {
      return "uniqueidhere"; //TODO: generate random hash
    }

    
    const storageRef = ref(storage, hash(imgInput));
   
   
    
    uploadBytes(storageRef, storageRef)
      
    storage.putFile(storageRef).then(async () => {//img url- hash file into str (string) as id and put hash into firestore db
        const taskWithImgUrl: Task = {
          text: titleInput,
          lost: false,
          checked: false,
          image: hash(imgInput) // <-- check the docs to see how to get this
        }

        addDoc(collection(db, "tasks"), taskWithImgUrl);
      })

    
    
    // 2. once that's done, run the code below


    setImgInput(undefined)
    setTitleInput("")
    setDateInput("")
    setLocationInput("")
    setDescriptionInput("")

    incrClear();
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
          key={
            inputKey
          }
          type="file"
          accept="image/*"
          placeholder="Upload Image Here"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImgInput(e.target.files[0])//change through useeffect and add that var as a dependency- keep track of file and when file becomes undefined 
            }
          }}
          /> 
        <Button type="submit">Add Post</Button>
      </VStack>
    </form>
  )
}

export default TaskAddControl

