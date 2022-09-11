# 3813-assignment

# Chat System

## Git
### Git Layout
The git repository contains project folder and a README file. Angular app is in the project folder and the node server is in the server folder.
Default branch is main branch which is the latest convension.

### Version Control Approach
I commit when small features are achieved. Such as adding a form in html. This ensures me able to revert back to a specific version that all implemented features are functioning without any error.

When there is a complex issue occured where lots of changes are needed, a branch is created to solve the issue. Thus, the code is more clean and it allows me to trace back the changes I made at the specific time. When the issue is solved, I will merge the branch back to main since I am the only developer in this project.

## Data Structure
<!--  Describe the main data structures used in the program. For example, how the users and groups are represented. -->
Data for this project are stored in JSON text files (will change to MongoDB in phase 2).
### users
In users.json file, each user have 2 entities including 'username' and 'email'. These are used for log in authentication only. User details are stored in extendedUsers.json file. So that when user log into the system, their password(here is using email, may be replaced with encrypted password in phase 2) will not be sent through and increase the risk of exposing password in public.

### extendedUsers
extendedUsers.json file stores all user details including userid, username, and their role. 'userid' is the unique id of a user. For phase 1, 'username' is also unique and used as identifier. May change to user id for convenience of MongoDB database system. 'role' is the identifier of the permission of user when using the system, it works with the entity 'groupadmin' and 'groupassis' in groups to make sure user has certain permission to modify the data.

### group
Group details are stored in group.json file. The entities including 'groupid', 'groupusers', 'groupassis', and 'groupadmin'.
'groupid' is the unique id of a group, it is auto generated when creating a group. It is also used as identifier when searching or modifying the group.

'groupusers' includes the usernames of users that belongs to a certain group. Only users in the group can have access to the group by design.

'groupadmin' includes usernames of group admins. Group admins have the permission to create a group wich is authenticate by role. A group admin can also add users to a group and remove users out of a group. They also have the permission of creating channels within groups. By design, they are able to add or remove users from channels as well.

'groupassis' includes username of group assistants. A group assistant will have the permission of adding or remiving users from channels within a group. They can also create channels for groups.

### channel
Channels have entities of 'channelid', 'cgid', and 'channelusers'.
'channelid' is the unique id of the channel used as identifier when searching and modifying the channel. 
'cgid' is the group ids for the groups that a channel belongs to.
'channelusers' includes all the users that have access to the channel.


## REST API
<!-- The Angular front end should communicate with the Node.js server using a REST API. Describe each route provided, parameters, return values, and what it does. -->
The server is placed under the chat app folder for convenience. The main interaction used for communication between front end and back end is the HttpRequests. Since the project is local project, here the server is using and listening to the port 3000. The Angular app instead is hosting on port 4200.
### router

## Angular Architecture
<!-- Describe your Angular architecture in terms of components, services, and models. -->
