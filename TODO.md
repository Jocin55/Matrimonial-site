# Matrimonial Website Implementation TODO

## Backend Changes
- [x] Add gender field to User model (server/models/User.js)
- [x] Fix auth controller/routes (remove duplicate, fix signup bug in server/controllers/auth.controller.js and server/routes/auth.routes.js)
- [x] Update profile.controller.js to use Session for access check instead of ProfileAccess
- [x] Update request.controller.js to check genders when creating request (groom male, bride female)
- [x] Ensure routes are set up correctly (check server/routes/)

## Frontend Changes
- [x] Update SignUp.jsx to include horoscope input and gender select
- [x] Update BrowseProfiles.jsx to filter opposite gender profiles
- [x] Implement Profile.jsx to fetch profile data, show minimal/full based on Session access, add request access button if minimal
- [x] Implement Requests.jsx to display user's access requests status
- [x] Implement UserApprovals.jsx to list pending users and approve them
- [x] Implement AccessRequests.jsx to list pending access requests and approve them

## Testing
- [ ] Test signup with all fields
- [ ] Test login
- [ ] Test admin approval
- [ ] Test profile browsing and access request
- [ ] Test admin access approval and 24-hour expiration
