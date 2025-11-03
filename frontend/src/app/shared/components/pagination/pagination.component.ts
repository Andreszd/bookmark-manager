import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Component({
  standalone: true,
  selector: 'app-custom-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
  styleUrls: ['./pagination.component.css'], // You'll create this later
})
export class CustomPaginationComponent implements OnChanges {
  // --- Inputs from Parent Component ---
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1; // 1-based index

  // --- Output to Parent Component ---
  @Output() pageChange = new EventEmitter<number>();

  // --- Internal State ---
  totalPages: number = 0;
  pages: number[] = [];
  maxPagesToShow: number = 5; // e.g., [1, 2, 3, 4, 5] or [..., 5, 6, 7, ...]

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate pagination details whenever an input changes
    this.calculatePagination();
  }

  private calculatePagination(): void {
    if (this.totalItems <= 0 || this.itemsPerPage <= 0) {
      this.totalPages = 0;
      this.pages = [];
      return;
    }

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Ensure currentPage is within bounds
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    this.generatePageNumbers();
  }

  private generatePageNumbers(): void {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const max = this.maxPagesToShow;

    let startPage: number;
    let endPage: number;

    if (totalPages <= max) {
      // Less than max pages, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than max pages, calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(max / 2);
      const maxPagesAfterCurrentPage = Math.ceil(max / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Near the beginning
        startPage = 1;
        endPage = max;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Near the end
        startPage = totalPages - max + 1;
        endPage = totalPages;
      } else {
        // In the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Create an array of page numbers to display
    this.pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );
  }

  /**
   * Updates the current page and emits the event.
   * @param page The new page number (1-based).
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
