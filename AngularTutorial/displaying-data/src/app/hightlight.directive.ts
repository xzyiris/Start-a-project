
import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {
  @Input() highlightColor: string;
  @Input() defaultColor: string;
  constructor(private el: ElementRef) {
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red') ;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('transparent');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
