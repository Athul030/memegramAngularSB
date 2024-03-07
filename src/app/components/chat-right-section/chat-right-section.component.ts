import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Message, MessageType } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';
import { FullSizeImageComponent } from '../full-size-image/full-size-image.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import Picker from 'emoji-picker-element/picker';


@Component({
  selector: 'app-chat-right-section',
  templateUrl: './chat-right-section.component.html',
  styleUrls: ['./chat-right-section.component.css']
})
export class ChatRightSectionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() messages: Message[] = [];
  @Input() selectedUser!: UserDTO;
  @Input() roomId!: string;

  newMessage: string = '';

  private messageSubscription!: Subscription;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private storageSer: StorageService, private chatSer: ChatService, private ngZone: NgZone, private cdr: ChangeDetectorRef, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.messageSubscription = this.chatSer.getMessageSubject().subscribe((messages: Message[]) => {
      this.ngZone.run(() => {
        messages.forEach(message => {
          if (!this.messages.some(m => m.id === message.id)) {
            this.messages.unshift(message);
          }
        });
        this.scrollToBottom();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  sendMessage(): void {
    let messageText: string = this.newMessage;
    let currentUserId = this.storageSer.getUserId();
    this.chatSer.sendMessage(this.roomId, messageText, currentUserId,'');
    
    this.newMessage = '';
  }

  calculateScrollHeight(): number {
   if(this.messagesContainer){
    const messageElements =this.messagesContainer.nativeElement.getElementsByClassName('message');
    let totalHeight=0;
    for(let i=0;i<messageElements.length;i++){
      totalHeight+=messageElements[i].clientHeight;

    }
    return totalHeight;
   }
   return 0;
  }
  
  startCall(){}
  startVideoChat(){}


  sendImage(event: any): void {
    const fileInput = event.target;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const imageFile = files[0];

      this.chatSer.uploadImageInChat(imageFile).subscribe(imageUrl => {
        

        const currentUserId = this.storageSer.getUserId();
        let imageUrlName= imageUrl.body?.fileUrl;
        if(imageUrlName){

          this.chatSer.sendMessage(this.roomId, '', currentUserId,imageUrlName);
        }
        // Clear the file input
        fileInput.value = '';
      });
    }
  }

  openImageModal(imageUrl:string):void{
    const dialogRef = this.dialog.open(FullSizeImageComponent,{
      data:{imageUrl},
    })
    dialogRef.afterClosed().subscribe((result)=>{
      console.log("The image modal is closed");
    });
  }

  isEmojiPickerVisible!:boolean;
  
  addEmoji(event:{emoji:{native:any;};}){
    this.newMessage = `${this.newMessage}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;

  }

  emojiPreventClose($event:any){
    $event.stopPropagation();
  }
  
}