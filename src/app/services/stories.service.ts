import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Story } from '../models/story.model';
import { State } from '../models/tast-state.model';


@Injectable()
export class StoriesService {
  private list: Story[] = []
  private nextId: number = 1

  getNextId(): number {
    return this.nextId
  }

  constructor() {
    console.log('StoriesService constructor')

    this.create({ id: this.nextId, name: 'New order', description: 'description', tasks: [{id: 1, name: 'init', state: State.ToDo}, {id: 2, name: 'take order', state: State.ToDo}]  })
    this.create({ id: this.nextId, name: 'Send pack', description: 'description', tasks: [{id: 1, name: 'completition', state: State.ToDo}, {id: 2, name: 'pack', state: State.ToDo}]  })
    this.create({ id: this.nextId, name: 'Get payment', description: 'description', tasks: [{id: 1, name: 'payment module', state: State.ToDo}]  })
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
