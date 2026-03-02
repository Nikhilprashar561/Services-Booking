# Problem Statements and Required Features

1. A new user comes to the page and sees all registered service provider details displayed in cards.
2. A customer books a local service provider (service man) by sending a booking request.
3. The local service provider accepts the job or rejects it.
4. Job completed status — once the job is done, the status is shown to both customer and local provider.
5. The customer pays and gives a rating to the local service provider.

---

# Customer Side

5. Browse services by category.  
   // Basically search for a service man by category.

6. Search local service providers according to address, city, or area.

7. Create a booking request.

8. When a user sends a booking request to a provider, they include their own offered price. When the provider checks the booking request, they see all requirements, especially the included price, and then click to confirm the request.

9. Track booking status and show job status to the customer. After sending a booking request, show live status until the local provider reacts (accepts or rejects). The user can also cancel the job post.

10. Once the booking request is confirmed, both the user and provider can reschedule or cancel it.

11. Finally, the customer sends a review and feedback.

---

# Service Provider Side

12. After registering, the provider keeps updating and managing their profile and dashboard.

13. Toggle availability status — by default they are available, but they can change it to unavailable by clicking a button.

14. When they receive a booking request, they have two options: accept it or reject it.

15. Job Status — once they accept the job, they continuously update the job status:

   ```
   ["Requested", "Accepted", "On the way", "In process", "Completed", "Cancelled"]
   ```

16. Add work notes and upload before/after images after the job is completed from the provider's side.

---

# Platform Admin

The person who controls and manages the whole platform.

17. Approve service providers — check whether they are genuine or not.

18. Manage service categories — add new ones, remove, edit, or delete them.

19. Moderate reviews — the admin has full control of the platform, manages both customer and local provider behavior, and maintains good relationships.

---

# Backend Validation and Features 👇

## Here I discuss how I built the backend for this project. Below is a complete step-by-step guide.

1. Firstly, I understood the problem statement very carefully and deeply. I cleared all my questions about features and requirements and understood the complete workflow.

2. Project setup and database connection.

3. Then I thought about the whole application — how to store data for customers, local providers, and admin, how data comes from the frontend form, and how it will be stored in the database. Then, with the help of that, I designed the database schema.

4. Now it's time to start building the REST APIs.

---

# Frontend Validation and Features 👇

1. When a user opens the page without registering or logging in, first show all services category-wise. If they want to hire someone, registration/login is required.

A normal user opens the application and sees a list of available local services and their locations.

---
