import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
})
export class TicketComponent {

  ticketForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      doorNumber: ['', Validators.required]
    });
  }

  createTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      this.http.post<any>('your-backend-api-url', ticketData)
        .subscribe(
          response => {
            console.log('Ticket created successfully:', response);
            // Optionally, perform any additional actions after successful creation
          },
          error => {
            console.error('Error creating ticket:', error);
            // Optionally, handle error scenarios
          }
        );
    }
  }
}
