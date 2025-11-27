import {
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Directive({ selector: '[observe]', standalone: true })
export class InterSectionObserverDirective implements OnInit {
  intersectionObserver?: IntersectionObserver;
  @Output() observed = new EventEmitter();
  el!: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }
  ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.observed.emit();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    this.intersectionObserver?.observe(this.el.nativeElement);
  }
}
