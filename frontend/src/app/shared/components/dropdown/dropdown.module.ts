import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/Dropdown.service';
import { DropdownContentDirective } from './directives/DropdownContentDirective';
import { DropdownOriginDirective } from './directives/DropdownOriginDirective';
import { DropdownContainerComponent } from './components/dropdown-container/dropdown-container.component';

@NgModule({
  declarations: [
    DropdownContentDirective,
    DropdownOriginDirective,
    DropdownContainerComponent,
  ],
  imports: [CommonModule],
  providers: [DropdownService],
  exports: [
    DropdownContentDirective,
    DropdownOriginDirective,
    DropdownContainerComponent,
  ],
})
export class DropdownModule {}
