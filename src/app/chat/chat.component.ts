import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import  {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.model';
import {ChatMessage} from './shared/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageFC = new FormControl('');
  nickNameFc = new FormControl('');
  messages: ChatMessage[] = [];
  unsubscribe$ = new Subject();
  clientsTyping: ChatClient[] = [];
  clients$: Observable<ChatClient[]> | undefined;
  chatClient: ChatClient | undefined;
  error$: Observable<string> | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();
    this.messageFC.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.chatService.sendTyping(value.length > 0);
      });
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        this.messages.push(message);
      });
    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
      });
    if (this.chatService.chatClient) {
      this.chatService.sendNickName(this.chatService.chatClient.nickname);
    }
    this.chatService.listenForClientsTyping()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if (chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) {
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
        }
      });
    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
      });
    if (this.chatService.chatClient) {
      this.chatService.sendNickName(this.chatService.chatClient.nickname);
    }
    // this.chatService.connect();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(): void {
    console.log(this.messageFC.value);
    this.chatService.sendMessage(this.messageFC.value);
    this.messageFC.patchValue('');
  }

  sendNickName(): void {
    if (this.nickNameFc.value) {
     //
      this.chatService.sendNickName(this.nickNameFc.value);

      this.chatService.sendNickName(this.nickNameFc.value);
    }
  }
}
