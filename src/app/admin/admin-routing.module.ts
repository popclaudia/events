import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { AuthGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
const routes: Routes = [
  {
    
    path: '',
    canActivate: [AuthGuard],
        children: [
          { path: 'events', component: EventsComponent },
          { path: 'my-profile', component: MyProfileComponent },
        ]      
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
