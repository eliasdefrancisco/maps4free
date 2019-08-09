import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmbedMapComponent } from './embed-map.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [EmbedMapComponent],
  exports: [EmbedMapComponent]
})
export class EmbedMapComponentModule {}
