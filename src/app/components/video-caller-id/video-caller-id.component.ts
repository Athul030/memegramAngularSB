import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideocallService } from 'src/app/services/videocall.service';

@Component({
  selector: 'app-video-caller-id',
  templateUrl: './video-caller-id.component.html',
  styleUrls: ['./video-caller-id.component.css']
})
export class VideoCallerIdComponent {

  constructor(    public dialogRef: MatDialogRef<VideoCallerIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { callerName: string }, public videoCallSer:VideocallService) {}

  onAccept(): void {
    this.dialogRef.close('accept');
  }

  onDecline():void{
    this.dialogRef.close('decline');
  }
}
