## This overview needs a modification. but, you can get the rough idea about what this application is. Thank you!

# HostelOutingApplication

## Overview

The HostelOutingApplication is designed to manage and streamline the process of student outings for hostels. It allows students to request permissions, enables wardens to approve or reject these requests, and allows guards to verify approved permits. The system is structured to support three key actors: Students, Wardens, and Guards, each with distinct functionalities.

## Actors

1. **Student**: Requests permission to go outside the campus.
2. **Warden**: Approves or rejects outing requests from students.
3. **Guard**: Verifies the permits by looking at his system and ensures if students have the permission to allowed to leave the campus.

## Database Schema

### 1. StudentDetails
Stores information about each student.
- **Id** (Primary Key): Unique identifier for the student.
- **Name**: Full name of the student.
- **Hostel**: Hostel name where the student resides.
- **RoomNumber**: Room number within the hostel.
- **PhoneNumber**: Student's contact number.
- **ParentPhoneNumber**: Parent's contact number.
- **Address**: Student's home address.
- **DepartmentAndCourse**: Academic details of the student.

### 2. HistoryOfOutings
Tracks the history of outings for each student.
- **Id** (Foreign Key): References the student’s Id.
- **Day**: Day of outing.
- **Date**: Current date of outing.
- **Destination**: Where the student is going.
- **Out-Time**: Time when the student left.
- **In-Time**: Time when the student returned.

### 3. RequestForOuting 
Stores requests made by students for outings.
- **Id** (Foreign Key): References the student’s Id.
- **Name**: Full name of the student.
- **Day**: Day of the requested outing.
- **Destination**: Proposed destination.
- **Out-Time**: Requested time of departure.
- **In-Time**: Requested time of return.
- **Status**: Indicates the status of permit.

### 4. WardensDetails
Contains information about wardens.
- **Id** (Primary Key): Unique identifier for the warden.
- **Name**: Full name of the warden.
- **Hostel**: Hostel under the warden’s jurisdiction.
- **PhoneNumber**: Warden's contact number.

### 5. GuardInfo
Details of the guards.
- **Id** (Primary Key): Unique identifier for the guard.
- **Name**: Full name of the guard.
- **PhoneNumber**: Guard's contact number.

## Application Workflow

### Student
1. **Sign Up / Sign In**: Choose to sign up or sign in as a Student.
2. **Available Options**:
   - **RequestForOuting**: Submit a new outing request.
     - **Fields**: Id, Name, Day, Date, Destination, Out-Time, In-Time.
   - **HistoryOfHisOutings**: View the history of past outings, including current and previous outings.
3. **Process**: 
   - Requests submitted are stored in the `RequestForOuting` table.
   - If approved by the warden, the request details are moved to the `HistoryOfOutings` table.

### Warden
1. **Sign Up / Sign In**: Choose to sign up or sign in as a Warden.
2. **Available Options**:
   - **StudentDetails**: View detailed information about all students and their outing histories.
   - **RequestsForOuting**: Access and manage outing requests from students.
     - **Approve/Reject**: Warden can approve or reject the requests. Approved requests are moved to the `HistoryOfOutings` table; rejected requests remain in `RequestForOuting`.
3. **Process**:
   - Review requests and update the status (approved/rejected)[True/false].
   - View student details and outing history.

### Guard
1. **Sign Up / Sign In**: Choose to sign up or sign in as a Guard.
2. **Available Option**:
   - **Verification**: Verify students’ permit in his system to leave the campus.
3. **Process**: Check the `HistoryOfOutings` for the current day's approved outings to validate students.

## Getting Started

1. **Sign Up / Sign In**:
   - Choose your role (Student, Warden, or Guard).
   - Complete the sign-up process with the required details.
   
2. **Usage**:
   - Based on your role, access the functionalities relevant to your responsibilities.

## Conclusion

The HostelOutingApplication aims to facilitate efficient management of student outings, ensuring proper permissions and validation are handled seamlessly. Each actor—Student, Warden, and Guard—has distinct functionalities to ensure a smooth and controlled outing process.

For any issues or feature requests, please contact @krishnabisht.cse@gmail.com



