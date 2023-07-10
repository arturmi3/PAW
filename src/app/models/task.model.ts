import { state } from "@angular/animations"
import { State } from "./task-state.model"
import { createFind } from "rxjs/internal/operators/find"

export class Task  {
    id: number
    name: string
    note: string
    workLimit: number
    state: State
    created: Date
    started?: Date
    target?: Date
    ended?: Date
    rejected: boolean
    ownedBy: string

    constructor(id: number, name: string, note: string, workLimit: number, state: State, created: Date, target: Date | undefined, ownedBy: string, rejected: boolean)
    {
      this.id = id
      this.name = name
      this.note = note
      this.workLimit = workLimit
      this.state = state
      this.created = created
      this.target = target
      this.ownedBy = ownedBy
      this.rejected = rejected
    }
  }
