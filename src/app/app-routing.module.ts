import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'full-screen',
    component: FullScreenComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: '**',
    redirectTo: '/edit',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
