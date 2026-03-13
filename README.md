Cal.com Clone – Fullstack Scheduling App

A full-stack meeting scheduling application inspired by Cal.com. Users can create event types, share booking links, manage availability, schedule meetings, and receive email confirmations with meeting links.

Built using React, Node.js, Express, and MySQL

Features Implemented:

Event Type Management- Users can create and manage meeting types. Features: Create event types Edit event types Delete event types Custom booking link generation Duration configuration (15m, 30m, 60m etc.)

Availability Management- Users can define their availability. Features: Set available days Set available time ranges Slot generation based on availability Prevent booking outside availability

Public Booking Page- Users can book meetings using a shared booking link. Features: Calendar date picker Available slot display Name & email input Slot validation Double-booking prevention

Smart Slot Handling- The system dynamically generates available slots and filters out already booked ones. Features: Generate slots from availability Remove already booked slots Prevent double booking

Booking Confirmation UI- After successful booking: Confirmation card is shown Displays meeting date and time Shows confirmation message Option to book another meeting

Email Notifications- Users receive a confirmation email after booking.

Automatic Meeting Link Generation- Each booking automatically generates an online meeting link.

Booking Dashboard- Users can manage all bookings. Features: View bookings Cancel bookings

Cancel Booking- Users can cancel bookings from the dashboard. Booking status becomes cancelled Slot becomes available again Slot can be rebooked

Landing Page- A modern UI inspired by Cal.com. Includes: Scheduling preview card Responsive layout Navigation bar

Booking Flow: Create event type Set availability Share booking link User selects date & slot Booking created Confirmation email sent Meeting link generated Booking visible in dashboard

Author Himanshi Chauhan