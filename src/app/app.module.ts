import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './stories/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryComponent } from './stories/story/story.component';
import { StoryDetailsComponent } from './stories/story-details/story-details.component';
import { StoriesService } from './services/stories.service';
import { AuthService } from './services/auth.service';
import { JoinTasksPipe } from './pipes/join-tasks.pipe';
import { TasksProgressPipe } from './pipes/tasks-progress.pipe';
import { TasksComponent } from './tasks/tasks.component';
//import { TaskTrComponent } from './stories/task-tr';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    StoryComponent,
    StoryDetailsComponent,
    JoinTasksPipe,
    TasksProgressPipe,
    TasksComponent,
//    TaskTrComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [StoriesService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
