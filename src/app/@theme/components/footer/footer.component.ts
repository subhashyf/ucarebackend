import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Maintained with ♥ by <b><a href="https://ucare.co.in/" target="_blank">UCare IT</a></b> {{ FullYear }}</span>
    <div class="socials">
      <a href="https://github.com/" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="https://www.instagram.com/" target="_blank" class="ion ion-social-instagram"></a>
      <a href="https://accounts.google.com/signin/" target="_blank" class="ion ion-social-google"></a>
      <a href="https://in.pinterest.com/" target="_blank" class="ion ion-social-pinterest"></a>
      <a href="https://www.skype.com/en/" target="_blank" class="ion ion-social-skype"></a>
      <a href="https://www.tumblr.com/" target="_blank" class="ion ion-social-tumblr"></a>
      <a href="https://www.youtube.com/" target="_blank" class="ion ion-social-youtube"></a>
    </div>
  `,
})
export class FooterComponent implements OnInit {
  public FullYear;
  ngOnInit(){
    this.FullYear = (new Date().getFullYear()).toString();
  }
}
