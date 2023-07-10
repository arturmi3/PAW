import { Task } from "./task.model"

export class Story {
    id: number
    name: string
    description: string
    tasks: Task[]

    constructor(id: number, name: string, description: string, tasks: Task[])
    {
      this.id = id
      this.name = name
      this.description= description
      this.tasks = tasks
    }
}
