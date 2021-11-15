import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { ThemeComponent } from './theme/theme.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent, ThemeComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
