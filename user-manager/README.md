## Overview:

# My profile page...

- logged in user can view and edit his or her own profile
- edit profile modal is validated on required fields
- users can view and add tasks through the task manager
- tasks can be moved from one category to another (open to archived, archived to trash, etc.)

# User Directory page...

- lists all users the logged in user can see
- divides users into two groups: school peers and support staff
- allows users to filter users by various categories
- some filters are not resetting - working on a workaround for this

# Manage Users page...

- most underdeveloped page
- if the logged in user is a school admin, this page will allow him or her to assign job titles, google apps emails addresses and tool editing rights to users

## To run this program:

- npm install
- bower install
- gulp serve

## Notes:

- Logged in user is currently hard coded
- Source data currently lives in json files in Asset folder, but this will be swapped out with API calls
- Unit tests coming by COB monday.

