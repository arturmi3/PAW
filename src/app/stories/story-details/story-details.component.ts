import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';
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

  protected storyForm!: FormGroup<StoryForm>
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder,
    private storiesSvr: StoriesService) {}
  
  ngOnInit(): void {
    let s: any

    this.route.params.subscribe((params: Params) => {
      console.log(`params action= ${params['action']}`)
      
      this.action = Action[params['action'] as keyof typeof Action]

      console.log(`this.action= ${this.action}`)

      switch(this.action) {
        case Action.create:            
            this.storyForm = this.formBuilder.nonNullable.group({
              id: [this.storiesSvr.getNextId(), Validators.required],
              name: ['', Validators.required],
              description: [''],
              tasks: this.formBuilder.array([])
            });
                    break;
          case Action.edit:
            s = this.storiesSvr.get(params['id']);
            if (s === undefined) this.router.navigate(['/not-found']);
            else {
              console.log(`edit, id= ${(s as Story).id}`)
              this.storyForm = this.formBuilder.nonNullable.group({
                id: [(s as Story).id, Validators.required],
                name: [(s as Story).name, Validators.required],
                description: [(s as Story).description],
                tasks: this.formBuilder.array((s as Story).tasks)
              });

              //this.storyForm.value.id = (s as Story).id
              //this.storyForm.value.name = (s as Story).name
              //this.storyForm.value.description = (s as Story).description
            }
            break;
          case Action.view:
            s = this.storiesSvr.get(params['id']);
            if (s === undefined) this.router.navigate(['/not-found']);
            else {
              console.log(`view, id= ${(s as Story).id}`)
              this.storyForm = this.formBuilder.nonNullable.group({
                id: [(s as Story).id, Validators.required],
                name: [(s as Story).name, Validators.required],
                description: [(s as Story).description],
                tasks: this.formBuilder.array((s as Story).tasks)
              });

              //this.storyForm.value.id = (s as Story).id
              //this.storyForm.value.name = (s as Story).name
              //this.storyForm.value.description = (s as Story).description
            }
            break;
      }

    });
  }

  save(): void { 
    switch(this.action)
    {
      case Action.create:
        this.storiesSvr.create({ id: this.storyForm.value.id!, name: this.storyForm.value.name!, description: this.storyForm.value.description ?? '', tasks: [] })
        break
      case Action.edit:
        this.storiesSvr.update({ id: this.storyForm.value.id!, name: this.storyForm.value.name!, description: this.storyForm.value.description ?? '', tasks: [] })
        break
    }
    this.router.navigate(['']) 
  }

  cancel(): void { 
    this.router.navigate(['']) 
  }
}
