import { Component } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  stories: Story[] = []
  tasks: [number, string, Task][] = []

  constructor(private authsvr: AuthService, private storieSvr:  StoriesService)
  {
  }

  userIsLogged(): boolean {
    return this.authsvr.userIsLogged()
  }

  ngOnInit(): void {
    this.stories = this.storieSvr.getall()

    this.stories.forEach((s) => s.tasks.forEach((t) => this.tasks.push([s.id, s.name, t])))
  }
}
