import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { SurveyComponent } from './components/survey/survey.component';

// pages
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'tables',
        component: TableComponent,
      },
      {
        path: 'survey',
        component: SurveyComponent,
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
