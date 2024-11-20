import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {}

  /**
   * Sends an email notification to the rescue team with resource allocation details.
   * @param location - The location where the resources are required.
   * @param resourceName - The name of the allocated resource.
   * @param quantity - The quantity of the allocated resource.
   */
  sendResourceAllocationEmail(location: string, resourceName: string, quantity: number): void {
    const templateParams = {
      to_email: 'dhanushr2708@gmail.com', // Replace with the actual email of the rescue team
      message: `Location: ${location}\nAllocated Resource: ${resourceName} - (${quantity})`
    };

    emailjs
      .send('service_l4dfkmg', 'template_96k5ddg', templateParams, 'jEPILcDAkc9BbGSsH')
      .then(response => {
        console.log('Email sent successfully:', response.text);
        alert('Notification email sent to the rescue team.');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send notification email.');
      });
  }
}
