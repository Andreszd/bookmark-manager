import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'svg-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-loader.component.html',
  styleUrls: ['./svg-loader.component.css'],
})
export class SvgLoaderComponent implements OnInit {
  @Input() src!: string;
  icon?: SafeHtml;
  sanitizer = inject(DomSanitizer);
  constructor() {}

  ngOnInit(): void {
    window.fetch(this.src).then((res) => {
      if (res.ok) {
        res.text().then((content) => {
          this.icon = this.sanitizer.bypassSecurityTrustHtml(content);
        });
      }
    });
  }
}
