import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BindingDataComponent } from './binding-data/binding-data.component';
import {FormsModule} from '@angular/forms';
import { HightlightDirective } from './hightlight.directive';
import { UnlessDirective } from './unless.directive';



@NgModule({
  declarations: [
    AppComponent,
    BindingDataComponent,
    HightlightDirective,
    UnlessDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
