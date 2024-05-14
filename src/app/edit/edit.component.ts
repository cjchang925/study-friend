import { Component } from '@angular/core';
import { ToDo } from '../shared/interface/to-do';
import { Countdown } from './edit';
import { ContentService } from '../shared/service/content.service';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [
    trigger('colorModeChange', [
      state('true', style({ background: 'rgba(255, 255, 255, 0.4)' })),
      state('false', style({ background: 'rgba(255, 255, 255, 0.1)' })),
      transition('true => false', animate('0.2s', style({ background: 'rgba(255, 255, 255, 0.1)' }))),
      transition('false => true', animate('0.2s', style({ background: 'rgba(255, 255, 255, 0.4)' }))),
    ]),
  ],
})
export class EditComponent {
  /**
   * 倒數計時
   */
  public countdown: Countdown = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  /**
   * 待辦事項
   */
  public toDo: ToDo = {
    title: '',
    finishedPercentage: 0,
    items: [],
  };

  /**
   * 待辦事項列表
   */
  public toDos: ToDo[] = [];

  /**
   * 新增待辦事項的內容，由使用者輸入
   */
  public toDoItemContent: string = '';

  /**
   * 是否顯示新增待辦事項的彈窗
   */
  public showAddToDoItemModal: boolean = false;

  /**
   * 鼓勵文字
   */
  public encouragingText: string = '';

  /**
   * 當前元素
   */
  private element: any;

  constructor(public contentService: ContentService, private router: Router) {
    this.element = document.documentElement;
  }

  ngOnInit(): void {
    this.toDos = this.contentService.toDos;
    this.encouragingText = this.contentService.encouragingText;
    this.countdown.hours = this.contentService.countdown.hours();
    this.countdown.minutes = this.contentService.countdown.minutes();
    this.countdown.seconds = this.contentService.countdown.seconds();
  }

  /**
   * 新增待辦事項
   */
  public addToDoItem(): void {
    if (!this.toDoItemContent) {
      return;
    }

    this.toDo.items.unshift({ content: this.toDoItemContent, isDone: false });
    this.toDoItemContent = '';
  }

  /**
   *
   * @param index 待辦事項的索引
   */
  public deleteToDoItem(index: number): void {
    this.toDo.items.splice(index, 1);
  }

  /**
   * 重新整理待辦事項
   */
  public refreshToDo(): void {
    this.toDo = {
      title: '',
      finishedPercentage: 0,
      items: [],
    };
  }

  /**
   * 確認新增待辦事項，可接受無標題或是沒有待辦事項，後者相當於按下取消
   */
  public confirmAddingToDoItem(): void {
    this.showAddToDoItemModal = false;

    if (this.toDo.items.length === 0) {
      return;
    }

    // 這裡將待辦事項反轉，因為在畫面上是由上往下新增，但是在列表中是由下往上新增
    this.toDo.items.reverse();
    this.toDos.push(this.toDo);
    this.refreshToDo();
  }

  /**
   * 建立畫面並跳轉至 full-screen component
   */
  public buildScreen(): void {
    this.contentService.setCountdown(
      this.countdown.hours,
      this.countdown.minutes,
      this.countdown.seconds
    );
    this.contentService.encouragingText = this.encouragingText;
    this.contentService.toDos = this.toDos;

    // 進入全螢幕模式
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      this.element.msRequestFullscreen();
    }

    this.router.navigate(['/full-screen']);
  }

  /**
   * 重置設定
   */
  public refreshSetting(): void {
    this.countdown = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.toDos = [];
    this.encouragingText = '';
  }

  /**
   * 移除待辦事項
   * @param index 要移除的待辦事項的 index
   */
  public removeToDo(index: number): void {
    this.toDos.splice(index, 1);
  }
}
