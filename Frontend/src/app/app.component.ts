import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`, // Loads routed components based on path
})
export class AppComponent {
  title="dhanush";
}
//D:\USTCapstoneProject\Frontend\public