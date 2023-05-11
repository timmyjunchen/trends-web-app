import { StorageReference } from "firebase/storage"

export type Task = {
  text: string
  lost: boolean
  image: string // <-- this needs to be a hash
  checked: boolean
}

export type TaskWithId = Task & { /**TODO: CHANGE TO POST OBJ */
  id: string
  /** 
   * date: DATE OBJ ?
   * itemTitle: string
   * itemDescription: string
   * itemLocation: string
   * itemImg: __
   * itemCategory?
   * */
}
