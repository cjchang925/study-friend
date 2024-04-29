import { Component, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FireworksDirective } from '@fireworks-js/angular';
import { ToDo } from '../shared/interface/to-do';
import { ContentService } from '../shared/service/content.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
  animations: [
    trigger('buttonInOut', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('0.2s', style({ opacity: 1 }))),
      transition('true => false', animate('0.2s', style({ opacity: 0 }))),
    ]),
    trigger('countdownInOut', [
      state('true', style({ opacity: 1 })),
      state('false', style({ display: 'none' })),
      transition('true => false', animate('0.5s', style({ opacity: 0 }))),
    ]),
  ],
})
export class FullScreenComponent {
  /**
   * 煙火元素
   */
  @ViewChild('firework') firework!: ElementRef;

  /**
   * 當前時間，僅顯示小時與分鐘
   */
  public currentTime = moment().format('HH:mm');

  /**
   * 當前時間的字體大小，單位是 px
   */
  public currentTimeFontSize: number = 180;

  /**
   * 當前元素
   */
  private element: any;

  /**
   * 鼓勵文字
   */
  public encouragingText = '';

  /**
   * 鼓勵文字的字體大小，單位是 px
   */
  public encouragingTextFontSize: number = 32;

  /**
   * 待辦事項
   */
  public toDos: ToDo[] = this.contentService.toDos;

  /**
   * 倒數計時
   */
  public countdown: moment.Duration;

  /**
   * 倒數計時的字體大小，單位是 px
   */
  public countdownFontSize: number = 44;

  /**
   * 倒數計時狀態
   */
  public countdownState: boolean = true;

  /**
   * 調整文字大小的按鈕是否顯示
   */
  public showAdjustingButton: boolean = true;

  /**
   * 調整文字大小的按鈕顯示時間
   */
  public showAdjustingButtonDuration: moment.Duration;

  constructor(private contentService: ContentService, private router: Router) {
    this.countdown = this.contentService.countdown.clone();
    this.encouragingText = this.contentService.encouragingText;
    this.showAdjustingButtonDuration = moment.duration(5, 'seconds');

    // 每秒更新當前時間
    setInterval(() => {
      this.currentTime = moment().format('HH:mm');
    }, 1000);

    this.element = document.documentElement;

    // 每秒檢查調整按鈕的顯示時間，如果已經是 0 秒，則隱藏按鈕，否則減少 1 秒
    setInterval(() => {
      if (this.showAdjustingButtonDuration.asSeconds() > 0) {
        console.log(this.showAdjustingButtonDuration.asSeconds());
        this.showAdjustingButtonDuration.subtract(1, 'second');
      } else {
        this.showAdjustingButton = false;
      }
    }, 1000);

    if (this.countdown.asSeconds() === 0) {
      this.countdownState = false;
      return;
    }

    // 計算倒數計時
    const countdownInterval = setInterval(() => {
      if (this.countdown.asSeconds() > 0) {
        this.countdown.subtract(1, 'second');
      } else {
        // 倒數計時為 0 時，將倒數計時文字移除，並顯示煙火
        this.countdownState = false;
        this.startFirework();
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  /**
   * 開始放煙火
   */
  private startFirework(): void {
    console.log('start firework');

    // adjust firework element's z-index to 2
    this.firework.nativeElement.style.zIndex = 2;

    // 將放煙火的 div 傳進 FireworksDirective
    const fireworks = new FireworksDirective(this.firework);

    // 放煙火
    fireworks.start();

    // 5 秒後隱藏煙火
    setTimeout(() => {
      fireworks.stop();
      this.firework.nativeElement.style.zIndex = 0;
    }, 10000);
  }

  /**
   * 進入全螢幕模式
   */
  public toFullScreen(): void {
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      this.element.msRequestFullscreen();
    }
  }

  /**
   * 離開全螢幕模式，回到設定頁面
   */
  public toSetting(): void {
    this.router.navigate(['/edit']);
  }

  /**
   * 取得倒數計時的剩餘時間
   * @returns 剩餘時間
   */
  public getRemainingTime(): string {
    const hours = this.countdown.hours().toString().padStart(2, '0');
    const minutes = this.countdown.minutes().toString().padStart(2, '0');
    const seconds = this.countdown.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * 滑鼠移動時，顯示調整文字大小的按鈕，並設定按鈕顯示時間為 3 秒
   */
  public onMouseMove(): void {
    this.showAdjustingButton = true;
    this.showAdjustingButtonDuration = moment.duration(5, 'seconds');

    if (this.firework.nativeElement.style.zIndex === 2) {
      this.firework.nativeElement.style.zIndex = 0;
    }
  }
}
