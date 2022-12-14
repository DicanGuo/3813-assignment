import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { UpdateChannelComponent } from './update-channel/update-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    HomeComponent,
    GroupComponent,
    ChannelComponent,
    AddGroupComponent,
    UserManagementComponent,
    CreateUserComponent,
    CreateGroupComponent,
    UpdateGroupComponent,
    CreateChannelComponent,
    UpdateChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
