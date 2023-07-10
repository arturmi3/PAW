import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { Task } from 'src/app/models/task.model';
import { State } from 'src/app/models/task-state.model';
import { StoriesService } from 'src/app/services/stories.service';

enum Action { create, view, edit, delete }

type StoryForm = {
  id: FormControl<number>
  name: FormControl<string>
  description: FormControl<string>
  tasks: FormArray
};


@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  action: Action = Action.create

  private story?: Story

  protected storyForm!: FormGroup<StoryForm>
  
  taskStates = [State.ToDo, State.Doing, State.Done]
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    private storiesSvr: StoriesService) {}
  
  get tasksArray() {
    return this.storyForm.controls["tasks"] as FormArray;
  }

  createItem(item: Task) {
    return this.fb.group({
      id: [item.id, [Validators.required]],
      name: [item.name, [Validators.required, Validators.minLength(3)]],
      note: [item.note, [Validators.maxLength(2000)]],
      workLimit: [item.workLimit, [Validators.min(0.25), Validators.max(1000)]],
      state: [item.state, [Validators.required]],      
      created: [item.created.toISOString().split("T")[0], [Validators.required]],
      started: [item.started?.toISOString().split("T")[0]],
      target: [item.target?.toISOString().split("T")[0], [Validators.required]],
      ended: [item.ended?.toISOString().split("T")[0]],
      rejected: [item.rejected, [Validators.required]],
      ownedBy: [item.ownedBy],
    });
  }

  ngOnInit(): void {
    let s: any

    this.route.params.subscribe((params: Params) => {
      console.log(`params action= ${params['action']}`)
      
      this.action = Action[params['action'] as keyof typeof Action]

      console.log(`this.action= ${this.action}`)

      switch(this.action) {
        case Action.create:            
            this.story = new Story(this.storiesSvr.getNextId(), '', '', [])

            this.storyForm = this.fb.nonNullable.group({
              id: [this.story.id, Validators.required],
              name: [this.story.name, Validators.required],
              description: [this.story.description],
              tasks: this.fb.array([])
            });
                    break;
          case Action.edit:
            s = this.storiesSvr.get(params['id']);
            if (s === undefined) this.router.navigate(['/not-found']);
            else {
              this.story = s as Story

              console.log(`edit, id= ${this.story.id}`)
              this.storyForm = this.fb.nonNullable.group({
                id: [this.story.id, Validators.required],
                name: [this.story.name, Validators.required],
                description: [this.story.description],
                tasks: this.fb.array(this.story.tasks.map((item: Task) => this.createItem(item)))
              });

              //this.storyForm.value.id = story.id
              //this.storyForm.value.name = story.name
              //this.storyForm.value.description = story.description
            }
            break;
          case Action.view:
            s = this.storiesSvr.get(params['id']);
            if (s === undefined) this.router.navigate(['/not-found']);
            else {
              this.story = s as Story
              console.log(`view, id= ${this.story.id}`)
              this.storyForm = this.fb.nonNullable.group({
                id: [this.story.id, Validators.required],
                name: [this.story.name, Validators.required],
                description: [this.story.description],
                tasks: this.fb.array(this.story.tasks.map((item: Task) => this.createItem(item)))
              });

              //this.storyForm.value.id = story.id
              //this.storyForm.value.name = story.name
              //this.storyForm.value.description = story.description
            }
            break;
      }

    });
  }

  addNewTask() : void
  {
    let last_id: number = 0
    this.tasksArray.value.forEach((e: any) => { last_id = (e.id > last_id) ? e.id : last_id })
    
    let item = new Task(last_id + 1, '', '', 1, State.ToDo, new Date(), undefined, '', false)
    this.tasksArray.push(this.createItem(item))
  }

  deleteTask(index: number) : void {
    this.tasksArray.removeAt(index)
  }

  save(): void { 
    let _tasks: Task[] = []

    switch(this.action)
    {
      case Action.create:
        if (!this.storyForm.valid) { alert("Uzupełnij dane!"); return;}
        _tasks = this.storyForm.value.tasks.map((t:any) => new Task(t.id, t.name, t.note, Number.parseFloat(t.workLimit), Number.parseInt(t.state), new Date(t.created), new Date(t.target), t.ownedBy, t.rejected))
        this.storiesSvr.create({ id: this.storyForm.value.id!, name: this.storyForm.value.name!, description: this.storyForm.value.description ?? '', tasks: _tasks })
        break
      case Action.edit:
        if (!this.storyForm.valid) { alert("Uzupełnij dane!"); return;}
        _tasks = this.storyForm.value.tasks.map((t:any) => new Task(t.id, t.name, t.note, Number.parseFloat(t.workLimit), Number.parseInt(t.state), new Date(t.created), new Date(t.target), t.ownedBy, t.rejected))
        this.storiesSvr.update({ id: this.storyForm.value.id!, name: this.storyForm.value.name!, description: this.storyForm.value.description ?? '', tasks: _tasks })
        break
    }
    this.router.navigate(['']) 
  }

  cancel(): void { 
    this.router.navigate(['']) 
  }
}
