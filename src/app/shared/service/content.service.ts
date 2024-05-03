import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ToDo } from '../interface/to-do';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /**
   * 倒數計時
   */
  public countdown: moment.Duration = moment.duration({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /**
   * 勵志小語
   */
  public encouragingText: string = '';

  /**
   * 待辦事項列表
   */
  public toDos: ToDo[] = [];

  /**
   * 背景模式，light 為淺色，dark 為深色
   */
  public colorMode: 'light' | 'dark' = 'light';

  /**
   * 設定倒數計時
   * @param hours 小時
   * @param minutes 分鐘
   * @param seconds 秒
   */
  public setCountdown(hours: number, minutes: number, seconds: number): void {
    this.countdown = moment.duration({ hours, minutes, seconds });
  }
}
