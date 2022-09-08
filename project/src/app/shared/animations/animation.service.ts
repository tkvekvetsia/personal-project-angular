import { Injectable } from '@angular/core';
export interface Item {
  name: string;
}
@Injectable()
export class AnimationService {
  private items: Item[] = [
    { name: 'Subjects' },
    { name: 'Teachers' },
    { name: 'Students' },
    { name: 'Admins' },
    { name: 'Gradebooks' },
    { name: 'Profile' },
  ];

  getItems(): Item[] {
    return [...this.items];
  }

  getItemByIndex(index: number): { name: string } {
    return this.items[index];
  }
}
