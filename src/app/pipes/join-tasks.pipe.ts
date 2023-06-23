import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
import { State } from '../models/tast-state.model';

@Pipe({
  name: 'joinTasks'
})
export class JoinTasksPipe implements PipeTransform {

  transform(list: |Array<Task>, sep=','): string {
    return list.map(o => `${o.name} (${State[o.state]})`).join(sep);
  }

}
