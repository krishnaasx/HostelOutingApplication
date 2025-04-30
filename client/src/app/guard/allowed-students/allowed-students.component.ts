import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { UpdateInStatusService } from "../../_services/update-in-status.service";

@Component({
    selector: 'app-allowed-students',
    imports: [
        NgFor,
        MatTableModule
    ],
    templateUrl: './allowed-students.component.html',
    standalone: true,
    styleUrl: './allowed-students.component.css'
})
export class AllowedStudentsComponent {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private location = inject(Location);
  private updateInStatusService = inject(UpdateInStatusService);

  Requests: any[] = [];
  displayedColumns: string[] = ['Serial-Number', 'Student-ID', 'Day', 'Date', 'Destination', 'Out-time', 'In-time', 'In-status', 'Update'];

  constructor() {
    this.seeAllowedStudents();
  }

  seeAllowedStudents() {
    this.http.get<any>("https://localhost:5001/api/outingrequest/see-history").subscribe({
      next: (response) => {
        this.Requests = response;
        console.log(this.Requests);
      },
      error: error => this.toastr.error(error.error)
    })
  }

  update(serialNumber: any, status: boolean) {
    this.updateInStatusService.updateInStatus(serialNumber, !status).subscribe({
      next: (response) => {
        console.log(response);
        this.Requests = this.Requests.map((request: any) => {
          if (request.serialNumber == serialNumber) {
            request.inStatus = !status;
          }
          return request;
        });
        this.toastr.success('in-status updated successfully');
      },
      error: (err) => this.toastr.error(err.error),
    });
  }

  goback() {
    this.location.back();
  }

}
