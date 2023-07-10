import { Task } from './../models/task.model';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Story } from '../models/story.model';
import { State } from '../models/task-state.model';


@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private list: Story[] = []
  private nextId: number = 1

  getNextId(): number {
    return this.nextId
  }

  constructor() {
    console.log('StoriesService constructor')

    this.create({ id: this.nextId, name: 'First story', description: 'description', tasks: [
      new Task(1, 'Zadanie 1', '', 3, State.ToDo, new Date(2023, 5, 1), new Date(2023, 6, 5), 'developer1', false),
      new Task(2, 'Zadanie 2', '', 5, State.ToDo, new Date(2023, 5, 1), new Date(2023, 6, 5), 'developer2', false)
    ]  })
    this.create({ id: this.nextId, name: 'Second story', description: 'description', tasks: [
      new Task(1, 'Zadanie 1', '', 3, State.ToDo, new Date(2023, 5, 1), new Date(2023, 6, 5), 'developer1', false),
    ]  })
    this.create({ id: this.nextId, name: 'Third story', description: 'description', tasks: [
      new Task(1, 'Zadanie 1', '', 3, State.ToDo, new Date(2023, 5, 1), new Date(2023, 6, 5), 'developer1', false),
      new Task(2, 'Zadanie 2', '', 4, State.ToDo, new Date(2023, 5, 1), new Date(2023, 6, 5), 'developer3', false)
    ]  })
  }

  getall() : Story[] {
      return this.list
  }

  get(id: number): Story | undefined {
    return this.list.find(x => x.id == id)
  }

  delete(id: number): void {
    let x: any = this.get(id)
    if(x !== undefined) {
      const index = this.list.indexOf(x, 0);
      if (index > -1) {
         this.list.splice(index, 1);
      }
    }
  }

  create(story: Story)
  {
    this.list.push(story)
    this.nextId++
  }

  update(story: Story)
  {
    let x: Story | undefined = this.get(story.id)
    if(x !== undefined) {
      x.name = story.name
      x.description = story.description
      x.tasks = story.tasks
    }
  }

}
