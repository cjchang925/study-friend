import { Component, Input } from '@angular/core';
import { ToDo } from '../../interface/to-do';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ContentService } from '../../service/content.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  animations: [
    trigger('buttonInOut', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('0.2s', style({ opacity: 1 }))),
      transition('true => false', animate('0.2s', style({ opacity: 0 }))),
    ]),
  ]
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
  @Input() public disabled: boolean = false;

  /**
   * 是否顯示展開或收起按鈕
   */
  @Input() public showMoreOrLessButton: boolean = false;

  /**
   * 待辦事項列表的最大高度，超過這個高度會顯示滾動條
   */
  public toDoListMaxHeight: number = 0;

  /**
   * 是否顯示完整高度
   */
  public showFullHeight: boolean = false;

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    // 設定待辦事項列表的最大高度
    this.toDoListMaxHeight = this.disabled ? window.innerHeight * 0.9 - 370 : window.innerHeight * 0.2
  }

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

  /**
   * 展開全部待辦事項
   */
  public expandMore(): void {
    this.showFullHeight = true;
    this.toDoListMaxHeight = window.innerHeight * 0.9 - 120;
  }

  /**
   * 收起部分待辦事項
   */
  public showLess(): void {
    this.showFullHeight = false;
    this.toDoListMaxHeight = window.innerHeight * 0.2;
  }
}
