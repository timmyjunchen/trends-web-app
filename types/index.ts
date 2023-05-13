import { StorageReference } from "firebase/storage"

export type Task = {
  owner: string
  text: string
  description: string //just added this
  lost: boolean
  image: string // <-- this needs to be a hash
  checked: boolean
}

export type Person = {
  uid: string | null
  username: string | null
  password: string | null
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
