import { Task } from "./task.model"

export type Story = {
    id: number
    name: string
    description: string
    tasks: Task[]  
}