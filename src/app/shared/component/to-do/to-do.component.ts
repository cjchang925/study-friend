import { Component, Input } from '@angular/core';
import { ToDo } from '../../interface/to-do';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent {
  /**
   * 待辦事項
   */
  @Input() public toDo: ToDo = {
    title: '',
    finishedPercentage: 0,
    items: [],
  };

  /**
   * 是否禁止點選並完成待辦事項，在設定的時候不允許使用者完成待辦事項
   */
  @Input() public disabled = false;

  /**
   * 計算待辦事項完成百分比
   * @returns 完成百分比
   */
  public getFinishedPercentage(): number {
    const finishedItems = this.toDo.items.filter((item) => item.isDone);
    return (finishedItems.length / this.toDo.items.length) * 100;
  }

  /**
   * 點擊待辦事項，標示為完成或未完成
   * @param index 完成待辦事項的 ID
   */
  public clickToDoItem(index: number): void {
    if (this.disabled) {
      return;
    }
    
    this.toDo.items[index].isDone = !this.toDo.items[index].isDone;
    this.toDo.finishedPercentage = this.getFinishedPercentage();
  }
}
