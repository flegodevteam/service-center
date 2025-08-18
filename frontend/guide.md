# AutoService Center – User Guide

## Overview

AutoService Center is a web-based Service Center Management System for managing customers, vehicles, appointments, job cards, inventory, billing, and reports.  
இந்த system-ஐ எளிதாக பயன்படுத்தவும், maintain செய்யவும் இந்த guide உதவும்.

---

## 1. Getting Started

### Prerequisites

- Node.js (v16 or above)
- MongoDB (local or cloud)
- Git

### Installation

#### 1. Clone the Repository

```sh
git clone https://github.com/your-org/service-center.git
cd service-center
```

#### 2. Install Dependencies

**Backend:**

```sh
cd backend
npm install
```

**Frontend:**

```sh
cd ../frontend
npm install
```

#### 3. Environment Variables

- Copy `.env.example` to `.env` in the backend folder.
- Set your MongoDB URI, JWT secret, and other configs.

#### 4. Start the Application

**Backend:**

```sh
cd backend
npm run dev
```

**Frontend:**

```sh
cd ../frontend
npm start
```

---

## 2. Usage

### Login

- Open [http://localhost:3000](http://localhost:3000)
- Login using your credentials.
- Roles: `admin`, `manager`, `technician`, `front-desk`

### Navigation

- Dashboard: Overview of service center.
- Customers: Manage customer details.
- Vehicles: Manage vehicle records.
- Appointments: Book and view appointments.
- Job Cards: Track service jobs.
- Inventory: Manage parts and stock.
- Billing: Generate and view bills.
- Reports: View analytics (admin/manager only).
- Settings: Manage system settings (admin only).

### Role-based Access

- **Admin:** Full access.
- **Manager:** Most modules except settings.
- **Technician:** Job cards, inventory, vehicles.
- **Front Desk:** Customers, appointments, billing, vehicles.

---

### Troubleshooting

- **Login Issues:** Check credentials, server status, and MongoDB connection.
- **Page Not Loading:** Ensure both backend and frontend servers are running.
- **Role Access Issues:** Check user role in the database.

<!--  -->

## 3. Customers Management

### Adding a New Customer

1. Navigate to the **Customers** page from the sidebar.
2. Click the **Add Customer** button.
3. Fill in the customer details:
   - Name
   - Email
   - Phone (10 digits)
   - Address
   - Number of Vehicles
   - Last Service Date
   - Status (Active/Inactive)
4. Click **Save Customer**.
5. The new customer will appear in the list.

### Editing a Customer

1. On the Customers page, find the customer you want to edit.
2. Click the **Edit** (pencil) icon.
3. Update the required fields.
4. Click **Save Changes**.

### Deleting a Customer

1. On the Customers page, find the customer you want to delete.
2. Click the **Delete** (trash) icon.
3. Confirm the deletion in the popup.

### Searching & Filtering

- Use the search bar to find customers by name, email, or phone.
- Use the filter button for advanced filtering (if implemented).

### Pagination

- Use the **Previous** and **Next** buttons at the bottom to navigate through pages if there are many customers.

---

<!--  -->

## 4. Vehicles Management

### Adding a New Vehicle

1. Go to the **Vehicles** page from the sidebar.
2. Click the **Add Vehicle** button.
3. Fill in the vehicle details:
   - Make (e.g., Toyota)
   - Model (e.g., Innova)
   - Year (e.g., 2022)
   - Registration Number
   - VIN (Vehicle Identification Number)
   - Owner (Select an existing customer from the dropdown. If not found, add the customer first.)
   - Last Service Date
   - Next Service Date
   - Status (Active/Inactive)
   - Notes (optional)
4. Click **Add Vehicle**.
5. The new vehicle will appear in the list.

### Editing a Vehicle

1. On the Vehicles page, find the vehicle you want to edit.
2. Click the **Edit** (pencil) icon.
3. Update the required fields.
4. Click **Save Changes**.

### Deleting a Vehicle

1. On the Vehicles page, find the vehicle you want to delete.
2. Click the **Delete** (trash) icon.
3. Confirm the deletion in the popup.

### Searching & Filtering

- Use the search bar to find vehicles by make, model, registration number, or owner.
- Use the filter button for advanced filtering (if implemented).

### Pagination

- Use the **Previous** and **Next** buttons at the bottom to navigate through pages if there are many vehicles.

<!--  -->

## 5. Appointments Management

### Adding a New Appointment

1. Go to the **Appointments** page from the sidebar.
2. Click the **Add Appointment** button.
3. Fill in the appointment details:
   - Customer (select from existing customers)
   - Vehicle (select from existing vehicles)
   - Service Type (choose from list)
   - Date
   - Time
   - Technician (assign a technician)
   - Notes (optional)
4. Click **Schedule Appointment**.
5. The new appointment will appear in the list and calendar view.

### Editing an Appointment

- (If implemented) Click the **Edit** icon next to the appointment, update the details, and save changes.

### Viewing Appointment Details

- Click the **Details** button to view full appointment information, including customer and vehicle details.

### Status Updates

- Use **Check In** to mark an appointment as "in-progress".
- Use **Job Card** to mark as "completed" after service is done.

### Deleting an Appointment

- (If implemented) Click the **Delete** icon and confirm deletion.

### Searching & Filtering

- Use the search bar to find appointments by customer, vehicle, or service type.
- Use the filter button for advanced filtering (if available).

### Calendar View

- Switch to the **Calendar** tab to see appointments by date.
- Click a date to view all appointments scheduled for that day.

### Pagination

- Use the **Previous** and **Next** buttons at the bottom to navigate through pages if there are many appointments.

<!--  -->

## 6. Job Cards Management

### Adding a New Job Card

1. Go to the **Job Cards** page from the sidebar.
2. Click the **New Job Card** button.
3. Fill in the job card details:
   - Customer (select from existing customers)
   - Vehicle (select from existing vehicles)
   - Date
   - Services (select one or more service types)
   - Technician (assign a technician)
   - Total Amount
4. Click **Add Job Card**.
5. The new job card will appear in the list.

### Viewing Job Card Details

- Click on a job card in the list to view its full details, including customer, vehicle, services, technician, and billing summary.

### Generating Job Card PDF

- In the job card details panel, click **Generate JobCard** to download the job card as a PDF.

### Marking a Job Card as Complete

- In the job card details panel, click **Mark as Complete** to update the job card status to "completed".

### Searching & Filtering

- Use the search bar to find job cards by customer, vehicle, or job card ID.
- Use the filter button for advanced filtering (if available).

### Pagination

- Use the **Previous** and **Next** buttons at the bottom to navigate through pages if there are many job cards.

<!--  -->

## 7. Inventory Management

### Adding a New Inventory Item

1. Go to the **Inventory** page from the sidebar.
2. Click the **Add Item** button.
3. Fill in the item details:
   - Item ID (unique)
   - Name
   - Category (e.g., Spare Parts, Consumables)
   - Stock (current quantity)
   - Min Stock (minimum required quantity)
   - Price (per unit)
   - Location (where the item is stored)
   - Status (In Stock, Low Stock, Out of Stock)
4. Click **Add Item**.
5. The new item will appear in the inventory list.

### Viewing Inventory

- All inventory items are listed in a table with columns for ID, Name, Category, Stock, Min Stock, Price, Location, and Status.
- Status is color-coded for easy identification (green: in stock, yellow: low stock, red: out of stock).

### Searching & Filtering

- Use the search bar to find items by name, ID, or category.
- Use the filter button for advanced filtering (if available).

### Inventory Summary

- At the top, summary cards show:
  - Total Items
  - Low Stock Items
  - Total Value of Inventory
  - Pending Orders (if implemented)

### Low Stock Alerts

- Items with stock below the minimum are highlighted as "Low Stock" or "Out of Stock".

### Pagination

- If there are many items, use the **Previous** and **Next** buttons at the bottom to navigate through pages.

<!--  -->

## 8. Billing & Payments

### Adding a New Invoice

1. Go to the **Billing** page from the sidebar.
2. Click the **New Invoice** button.
3. Fill in the invoice details:
   - Customer (select from existing customers)
   - Vehicle (select from existing vehicles)
   - Date
   - Amount
   - Payment Status (Pending, Paid, Cancelled)
   - Payment Method (e.g., Cash, Card; required if status is Paid)
4. Click **Save Invoice**.
5. The new invoice will appear in the list.

### Viewing Invoice Details

- Click on an invoice in the list to view full details, including customer, vehicle, service summary, and payment information.

### Downloading Invoice as PDF

- In the invoice details panel, click **Download PDF** to download the invoice as a PDF file.

### Processing Payments

- For invoices with status "Pending", click **Process Payment** in the details panel to mark as "Paid" and update the payment method.

### Searching & Filtering

- Use the search bar to find invoices by invoice number, customer, or vehicle.
- Use the filter button for advanced filtering (if available).

### Summary Cards

- At the top, summary cards show:
  - Total Revenue (sum of all paid invoices)
  - Pending Payments (sum of all pending invoices)
  - Invoices This Month (count)

### Pagination

- Use the **Previous** and **Next** buttons at the bottom to navigate through pages if there are many invoices.

<!--  -->

## 9. Reports & Analytics

### Overview

The **Reports** module helps you analyze your service center’s performance with visual charts and summary cards.

### Accessing Reports

- Go to the **Reports** page from the sidebar.

### Report Types

- **Revenue Report:** View monthly revenue trends, total revenue, and average job value.
- **Service Analysis:** See which services are most popular and generate the most revenue.
- **Inventory Usage:** (Coming soon) Analyze inventory consumption and stock trends.
- **Technician Performance:** (Coming soon) Compare technician productivity.

### Using the Reports Page

1. **Select Report Type:**  
   Use the "Report Type" dropdown to switch between revenue, service, inventory, and technician reports.

2. **Select Date Range:**  
   Use the "Date Range" dropdown to filter data by week, month, quarter, or year.

3. **Summary Cards:**  
   At the top, view key metrics such as:

   - Total Revenue
   - Average Job Value
   - Jobs Completed
   - New Customers (if available)

4. **Charts & Tables:**
   - **Bar Chart:** Shows monthly revenue.
   - **Pie Chart:** Shows service distribution by jobs.
   - **Table:** Lists top performing services with job count, revenue, and average value.

<!--  -->

## 10. Admin & System Settings

### Overview

The **Settings** module allows admins to manage users, configure services, and control system-wide preferences for smooth operation and future maintenance.

### User Management

- **Add User:**

  1. Go to the **Settings** page and select the "User Management" tab.
  2. Click **Add User**.
  3. Fill in username, email, role (admin, manager, technician, front-desk), and password.
  4. Click **Save** to create the user.

- **Edit User:**

  1. Click the **Edit** icon next to a user.
  2. Update details and save.

- **Delete User:**

  1. Click the **Delete** icon next to a user (admin users cannot be deleted).
  2. Confirm deletion.

- **Activate/Deactivate User:**
  - Toggle user status between active and inactive as needed.

### Service Configuration

- **Add/Edit/Delete Service Types:**

  1. Go to the "Service Configuration" tab.
  2. Add new service types with name, category, base price, and duration.
  3. Edit or delete existing service types as required.

- **Manage Service Packages:**
  - Create, edit, or delete service packages for bundled offerings.

<!--  -->

## 11. Dashboard

### Overview

The **Dashboard** provides a quick summary of your service center’s daily operations and key metrics in one place.

### Key Features

- **Stats Cards:**

  - **Today's Appointments:** Number of appointments scheduled for today.
  - **Total Customers:** Total registered customers.
  - **Vehicles Serviced:** Total vehicles in the system.
  - **Revenue This Month:** Total revenue generated in the current month.

- **Today's Appointments:**

  - View a list of all appointments scheduled for today, including customer, vehicle, service, and time.
  - Quick link to view all appointments.

- **Quick Actions:**

  - Add New Customer (admin, manager, front-desk)
  - Register New Vehicle (all roles)
  - Schedule Appointment (admin, manager, front-desk)
  - Create Job Card (admin, manager, technician)

- **Service Trends Chart:**

  - Visual bar chart showing the number of jobs per service type (last 6 months or as available).

- **Service Center Status:**
  - Daily Revenue (progress bar)
  - Active Technicians (progress bar)
  - Low Stock Items (progress bar)
