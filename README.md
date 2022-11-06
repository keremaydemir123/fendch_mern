# fendch_mern

GOALS:

1) Save github user to database by selecting necessary fields only -> (id, username, displayName, avatar, github url, repos url etc.) - [x] 
2) Create first project (check if its unique)
3) When a project is created update necessary models and fields -> (challenge.totalSubmits, challenge.projects, user.projects etc.)


NOTES AFTER LAST COMMIT:

## Whats new?

#### Client:
- admin panel structure changed, new routes added
- admin role is added if user is admin, he/she can see admin Link in Navbar
- admin can create a challenge and he/she can see the preview of the challenge card
- admin can see secret challenges and edit them(?)
- new Input component added

#### Server:
- user saved to db differently 
- updateChallenge route is added but it may need a refactor and validation
- userRoutes are added
- userController is created


## Any bugs?
# OFC.
1- When you edit a challenge its ok. Everything seems normal
You can see the difference in secret challenges tab also, again its ok
However, when you click the edit button again for the same challenge, 
it shows the previous version,
Furthermore, if you changed the Java challenge and wanted to edit Go challenge
it links you again to the Java challenge. INTERESTING

2- startDate is not working for Date input

## Whats next?

#### Client:
- "are you sure?" popup
- challengeCard design
- bug fix for admin panel
- protected route for admin page
- tags component
- search component for challenges page
- search functionality
- pagination component
- new color for cards
- comment component
- navbar needs to be responsive
- all card containers must be responsive
- sorting and filtering functionality for projects page

#### Server:
- Middleware that checks time and changing isSecret and isActive states
- Project creation
- Pagination functionality for challenges and projects

 


