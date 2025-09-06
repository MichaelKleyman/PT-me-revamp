# Revamp

## TODO

- [] Clean up the `ViewPatientsPage` component and split it up into chunks
- [] Address any type errors on the client side
- [] Look into setting up proper eslint rules for the code base as well as some fix check scripts that catch type errors globally
- [] Create exercises page with proper CRUD actions on client and server side
- [] Add more logic to the patients page table like filtering and sorting etc.
- [] Make the patient input form not take full name in one text field but have seperate fields for first name and last name and possiby middle name
  - Requires many BE changes in the database tables as well as the hono routes
- [] Split up the zustand store folder into appropriate stores
- [] Create reusable helper function on the backend that will perform simple `getById` drizzle calls

## Current Practice/Practitioner creation flow

- When a practicioner goes to register, they have no PT practice affiliated with the software and are new customers.
  - The practitioner who is registering needs to enter initial round of information necessary for first time enrollment (email, practice name, address of practice, admin practitioner username, and license number)
  - As a first time enrollment, this practitioner will automatically be added as the admin for the practice.
  - Following successful completion, they are routed to their practice dashboard where second round of necessary information regarding the practice is required to be filled out.
- When a new practitioner needs to be added to the existing software, they do not go through the normal registration process.
  - They need to be given an invitation link by one of the admins of the practice where they are routed to a special portal to complete theyre enrollment for the practice they will be affiliated with.
