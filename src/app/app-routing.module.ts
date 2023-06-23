import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './stories/home/home.component';
import { StoryComponent } from './stories/story/story.component';
import { StoryDetailsComponent } from './stories/story-details/story-details.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: 'stories/:action/:id', component: StoryDetailsComponent},
  { path: 'stories/:action/:id', component: StoryDetailsComponent},
  { path: 'stories/:action', component: StoryDetailsComponent},
  {
    path: '', component: HomeComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];


/*
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ChatListComponent, outlet: 'chat', canActivate: [ AuthGuardService ] },
  { path: 'users/:username', component: ChatComponent, outlet: 'chat', canActivate: [ AuthGuardService ] },
  { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule' },
  { path: '**', component: NotFoundComponent },
*/


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
