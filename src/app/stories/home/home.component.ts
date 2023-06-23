import { Observable } from 'rxjs';
import { StoryComponent } from './../story/story.component';
import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stories: Story[] = []

  constructor(private authsvr: AuthService, private storieSvr:  StoriesService)
  {
  }

  userIsLogged(): boolean {
    return this.authsvr.userIsLogged()
  }

  ngOnInit(): void {
    this.stories = this.storieSvr.getall()
  }

  onDelete(id: number) {
    console.log(`id= ${id}`)
    this.storieSvr.delete(id)
    this.stories = this.storieSvr.getall()
    console.log(`count= ${this.stories.length}`)
  }
}
