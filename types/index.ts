export type Task = {
  text: string
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
