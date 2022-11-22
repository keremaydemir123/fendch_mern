# fendch_mern

GOALS:

1) Create first project (check if its unique)
2) When a project is created update necessary models and fields -> (challenge.totalSubmits, challenge.projects, user.projects user.notifications etc.)


NOTES AFTER LAST COMMIT:

## Whats new?

#### Client:
- admin panel structure changed, new routes added
- admin role is added if user is admin, he/she can see admin Link in Navbar
- admin can create a challenge and he/she can see the preview of the challenge card
- admin can see secret challenges and edit them
- new Input component added
- new Badge component added

#### Server:
- user saved to db differently 
- updateChallenge route is added but it may need a refactor and validation
- userRoutes are added
- userController is created


## Any bugs?
1- startDate is not working for Date input

## Whats next?

#### Client:
- Update App.tsx, fix second fetch
- Add profile pic and links to notifications
- Follow, unfollow in profile page
- Preview in project card
- Challenge details page
- Add markdown to create project modal
- Project details page
- "are you sure?" popup
- challengeCard design
- protected route for admin page
- tags component
- search component for challenges page
- search functionality
- pagination component
- new color for cards
- comment component
- navbar needs to be responsive
- all card containers must be responsive
- Hot Fix: Create like notification and create follow notification[]

#### Server:
- Middleware that checks time and changing isSecret and isActive states
- addNotification and deleteNotification functions that takes a message to add or delete
- Pagination functionality for challenges and projects
- web socket
- firebase real time db notifications
- s3 img
- https://uploadcare.com/
- like a project: project.likes.push(liker.id)
- GET: liked projects
- Mail nodemailer mailgun 
- Change challenge fields with time
 


