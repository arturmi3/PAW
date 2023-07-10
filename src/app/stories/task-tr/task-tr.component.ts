import { Component, Input } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { Task } from 'src/app/models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-task-tr]',
  templateUrl: './task-tr.component.html',
  styleUrls: ['./task-tr.component.css']
})
export class TaskTrComponent {
  @Input()
  task: Task = new Task(0, '', '', 0, 0, new Date(), undefined, '', false)

  name: string = ''


  deleteTask(index: number) : void {

  }
}
