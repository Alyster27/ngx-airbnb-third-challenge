import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { SearchService } from './search.service';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonicModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZXJyaWgiLCJhIjoiY2t4NmJxaHowMmUxOTJxcHowOGk3cmNuciJ9.uSUn1P07gq5oX1YUe7JTCg', // Optional, can also be set per map (accessToken input of mgl-map)
    })
  ],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
