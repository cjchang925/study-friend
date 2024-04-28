import { Component } from '@angular/core';
import { ToDo } from '../shared/interface/to-do';
import { Countdown } from './edit';
import { ContentService } from '../shared/service/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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

  constructor(private contentService: ContentService, private router: Router) {
    this.element = document.documentElement;
  }

  /**
   * 新增待辦事項
   */
  public addToDoItem(): void {
    if (!this.toDoItemContent || this.toDo.items.length >= 5) {
      return;
    }

    this.toDo.items.push({ content: this.toDoItemContent, isDone: false });
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
}
