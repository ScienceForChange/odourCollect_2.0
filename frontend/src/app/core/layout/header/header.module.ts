import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburguerComponent } from './components/hamburguer/hamburguer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from '../../core-routing.module';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    HamburguerComponent,
    HeaderComponent,
    MenuComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    HttpClientModule,
    CoreRoutingModule,
  ],
  exports: [HeaderComponent, MenuComponent],
})
export class HeaderModule {}
