# Revamp

## TODO

- [x] Make the new routes/pages when logged in be authenticated routes
- [x] Choose which section to begin working on (Dashboard, Schedule, Patients)
- [x] Set up queries/mutations for whatever necessary operations are needed
- [] Create reusable helper function on the backend that will perform simple `getById` drizzle calls

## Current Practice/Practitioner creation flow

- When a practicioner goes to register, they have no PT practice affiliated with the software and are new customers.
  - The practitioner who is registering needs to enter initial round of information necessary for first time enrollment (email, practice name, address of practice, admin practitioner username, and license number)
  - As a first time enrollment, this practitioner will automatically be added as the admin for the practice.
  - Following successful completion, they are routed to their practice dashboard where second round of necessary information regarding the practice is required to be filled out.
- When a new practitioner needs to be added to the existing software, they do not go through the normal registration process.
  - They need to be given an invitation link by one of the admins of the practice where they are routed to a special portal to complete theyre enrollment for the practice they will be affiliated with.
