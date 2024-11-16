import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-submission-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './submission-success.component.html',
  styleUrls: ['./submission-success.component.css']
})
export class SubmissionSuccessComponent {
  // This component only shows the success message and provides a link to the update page
  constructor(private router: Router) {}

  navigateToUpdate() {
    // Navigate to the update-incident page
    this.router.navigate(['/app-update-incident']);
  }
}
