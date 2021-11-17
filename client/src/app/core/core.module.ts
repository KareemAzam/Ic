import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { ThemeComponent } from './theme/theme.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';

@NgModule({
  declarations: [NavBarComponent, ThemeComponent, TestErrorComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
