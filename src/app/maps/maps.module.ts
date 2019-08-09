import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapsPage } from './maps.page';
import { EmbedMapComponentModule } from '../components/embed-map/embed-map.module';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EmbedMapComponentModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
