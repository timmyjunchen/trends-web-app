import { ChatIcon } from "@chakra-ui/icons"
import { Checkbox, HStack, IconButton, Text, Image, VStack } from "@chakra-ui/react"
import { collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { TaskWithId } from "../../types"
import { db, storage } from "../../util/firebase"
import { useState, useEffect } from "react";
import { useInstantTransition } from "framer-motion"

type Props = {
  readonly task: TaskWithId
}

const TaskItem = ({ task: { id, text, description, lost, image, checked } }: Props) => { //TODO: CHANGE TO POST
  const toggleTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    updateDoc(taskDoc, { lost: !lost })//TODO: change to found: !found ?
  }

  const deleteTask = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
    deleteDoc(taskDoc)
  }

  const getDescription = () => {
    const taskDoc = doc(collection(db, "tasks"), id)
  }

  const [downloardUrl, setDownloadUrl] = useState("")

  useEffect(
    () => { getDownloadURL(ref(storage, image)).then((value: string) => { console.log(value); setDownloadUrl(value) }).catch((err) => console.log(err)) }, []
  )

  // const uploadImg = () => {
  //   // const taskDoc = doc(collection(db, "tasks"), id)
  //   return getDownloadURL(ref(storage, image))
  // }

  return (
    <HStack w="100%">
      <Checkbox isChecked={checked} onChange={toggleTask} />
      <Text textDecorationLine={checked ? "line-through" : "initial"}>
        {text}
      </Text>
      <Image 
        width = "150" 
        height = "150" 
        src={downloardUrl}
      />
      <IconButton
        aria-label="claim item"
        size="xs"
        variant="ghost"
        colorScheme="black"
        icon={<ChatIcon />} //TODO
        onClick={deleteTask} //TODO
      />
      <Text>
        {description}
      </Text>
    </HStack>
  )
}

export default TaskItem
