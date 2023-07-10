import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
import { State } from '../models/task-state.model';

@Pipe({
  name: 'tasksProgress'
})
export class TasksProgressPipe implements PipeTransform {

  private toPercent(x: number, p: number) : string {
    var percent = (x * 100).toFixed(p) + "%";
    return percent;
  }
  transform(list: |Array<Task>): string {
    let nToDo: number = 0
    let nDoing: number = 0
    let nDone: number = 0
    let hoursTotal: number = 0
    let hoursDone: number = 0


    list.forEach((t) => { 
      switch(t.state){
        case State.ToDo: 
          nToDo++; hoursTotal += t.workLimit; 
          break
        case State.Doing:
          nDoing++; hoursTotal += t.workLimit; 
          break
        case State.Done:
          nDone++; hoursTotal += t.workLimit; 
          hoursDone += t.workLimit; 
          break              
      }
    })
    return `${nToDo}/${nDoing}/${nDone} - ${hoursDone}/${hoursTotal}` + ((hoursTotal != 0) ? '=' + this.toPercent(hoursDone/hoursTotal, 2) : '')
  }
}
