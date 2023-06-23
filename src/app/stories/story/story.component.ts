import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent {
  @Input() story: Story = { id: 0, name: '', description: '', tasks: [] };
}
