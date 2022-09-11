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
Multiple routers are created to seperate the functions and data transmitted. Ideally it can reduce the traffic to increase the speed of data transmission. Certain data is required and sent back to front. The requirement of data is different from route to route.
1. assignUser route is used for admins to assigning a user a role. A group object and user id is sent to server. JSON files are read and data are compared for input validation. If successful, a user's role will be changed and written to JSON file. His name will be saved to group details under groupadmin or groupassis list. The return value including an array that contains updated user array. With an ok value to inform the front end if the change is success. There is also a message value to inform front end what specific went wrong or the change is success.
2. channel route is used to fetch channel details from JSON file. An array that contains all channel information is sent back to front end.
3. createChannel route is used for creating a channel. A group object is required and sent from front end. If the group is valid, the system will generate a new channel with a unique channel ID. An array of updated channels information will be sent, with an ok value to inform the front end if the change is success. There is also a message value to inform front end what specific went wrong or the change is success.
4. createGroup route is for creating group. In front end, there is a form implemented requiring user input a user, an admin, and an assistant for the group. The data is sent and fetched by server. After validation, the data will be written to JSON file. An array of updated groups with validation value and message will be sent back to front end.
5. deleteChannel is used for deleting a channel. A group object and channel object are required and sent from front end. The system will validate the group details and channel details. If valid, the channel will be deleted. Updated channel arrays will be sent back to front end with valdation value and message.
6. deleteGroup route is used for deleting a group. A group object is sent from front end and validated at server side. If success, the group will be deleted. An array of updated group will be sent back to front end with valdation value and message.
7. deleteUser route is used for deleting a user. A user object is sent from front end and validated at back end. If success, the user will be deleted. An array of updated users will be sent back to front end with valdation value and message.
8. group route is used for fetching all group details and sent back to front end.
9. postLogin route is used for log in validation. Username and email will be sent to server and validated. If success will sent back to front end a valid value.
10. postLoginAfter route is used for creating a user. The input username and email will be validated and written to users.json file and extendedUsers.json files. An array of updated users will be sent back to front end with valdation value and message.
11. removeFromChannel route is used for admins removing a user from existing channels. An array of updated channels will be sent back to front end with valdation value and message.
12. updateChannel route is used for admins adding users to the channels. An array of updated channels will be sent back to front end with valdation value and message.
13. updateGroup route is used for admins adding users to a group. An array of updated groups will be sent back to front end with valdation value and message.


## Angular Architecture
<!-- Describe your Angular architecture in terms of components, services, and models. -->
### Components
#### app
app component is used as basic component with global navigation bar. Navigation links are restricted to roles. Only user with permission can see User Management page and Group Management page.
By default, user will be asked to login and redirect to log in page.

#### channel
channel component displays all the channels that is visible to user. For normal users, only Group information and channel ID, members name displayed. There is also a button for going into each channel for chatting with channel members. For admins, there are buttons for creating a chennel, deleting a channel, add or remove users from channels. 
#### chat
chat component displays the chat room that allows channel members to chat with texts. (In phase 2 user icon and video chat will be implemented.)
#### create-group
create-group component displays a form for admins to create a group. A group user, a group assistant, and a group admin is required. For more users, admins can add users in group page. When creation is successful, user will be redirected back to group list page.

#### create-user
create-user component provides a form for admins to create a new user with usrename and email.

#### group
group component provides a list of all visible groups. Admins can create or delete groups, add or remove users from groups, and assign users to group as group admin or group assistant. While admin functions are hidden to the normal users.

#### home
home page displays user profile after login. Before login, it displays a login button with text info asking user to login.

#### login
login page is simply a form allows user to input username and email to login.

#### user-management
user-management admins have permission to go to user management page. In this page all user info are listed, and admins can create or delet a user here.

### Services
#### Sockets
Sockets are used to retreive data from and send data to server reactively. It allows users to live communicate inside the channels.
When user send a text input, the socket service send it to the server and retreive data sent from other users.


