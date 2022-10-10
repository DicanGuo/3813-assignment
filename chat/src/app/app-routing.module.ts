import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';

import { UpdateChannelComponent } from './update-channel/update-channel.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'chat/:id', component: ChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'group', component: GroupComponent},
  // {path: 'group/:id/channel/:id', component: ChannelComponent},
  {path: 'users', component: UserManagementComponent},
  {path: 'add-group', component: AddGroupComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: 'update-group/:id', component: UpdateGroupComponent},
  {path: 'group/:id/channels', component: ChannelComponent},
  {path: 'group/:id/channels/:id', component: UpdateChannelComponent},
  {path: 'group/:id/create-channel', component: CreateChannelComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
