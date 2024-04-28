/**
 * 待辦事項介面
 */
export interface ToDo {
  /**
   * 標題
   */
  title: string;

  /**
   * 已完成百分比
   */
  finishedPercentage: number;

  /**
   * 事項列表
   */
  items: {
    /**
     * 內容
     */
    content: string;

    /**
     * 是否已完成
     */
    isDone: boolean;
  }[];
};
