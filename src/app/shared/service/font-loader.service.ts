import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontLoaderService {
  /**
   * 字體是否已載入
   */
  public fontLoaded: boolean = false;

  public async loadFont(): Promise<void> {
    const font = new FontFace(
      'sf-pro-display-bold',
      'url(assets/fonts/SF-Pro-Display-Bold.otf)'
    );
    await font.load();
    document.fonts.add(font);
    this.fontLoaded = true;
  }
}
