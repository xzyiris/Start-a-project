import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {CorpListComponent} from './corp-list/corp-list.component';
import {FormsModule} from '@angular/forms';
import { JobListComponent } from './job-list/job-list.component';
import { CustomPipePipe } from './custom-pipe.pipe';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'corpList', component: CorpListComponent},
  {path: 'jobList', component: JobListComponent},
  {path: 'articleList', component: ArticleListComponent},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CorpListComponent,
    WelcomeComponent,
    JobListComponent,
    CustomPipePipe,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
