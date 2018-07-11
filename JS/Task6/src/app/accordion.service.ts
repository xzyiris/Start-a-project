import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccordionService {

  constructor() { }
  displays = [false, false, false];
  toggles: Toggle[] = [
    new Toggle(),
    new Toggle(),
    new Toggle()
  ];
  collapse(index: number) {
    if (!this.displays[index]) {
      this.displays[index] = true;
      this.toggles[index].myCollapse = false;
      this.toggles[index].folder = true;
    } else {
      this.displays[index] = false;
      this.toggles[index].myCollapse = true;
      this.toggles[index].folder = false;
    }
  }
}
class Toggle {
  myCollapse = true;
  folder = false;
}
