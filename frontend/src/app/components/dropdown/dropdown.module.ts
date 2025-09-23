import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/Dropdown.service';
import { DropdownContentDirective } from './directives/DropdownContentDirective';
import { DropdownOriginDirective } from './directives/DropdownOriginDirective';

@NgModule({
  declarations: [DropdownContentDirective, DropdownOriginDirective],
  imports: [CommonModule],
  providers: [DropdownService],
  exports: [DropdownContentDirective, DropdownOriginDirective],
})
export class DropdownModule {}
