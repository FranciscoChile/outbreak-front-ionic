import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  files: Array<any> = [];
  state: StreamState | undefined;

  currentFile: any = {};  
  
  isSelected: any = null;
  loading: any = null;

  @ViewChild("rangeSong", { read: ElementRef })
  rangeSong!: ElementRef;

  constructor(private audioService: AudioService, public cloudService: CloudService, public auth: AuthService) {
   
    cloudService.getAlbumIndex("1").subscribe({
      next: (data) => {
        this.files = data.data;
      }
    });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;      
    });

  }

  ngAfterViewInit(): void {
    this.rangeSong.nativeElement.value = "0";
  }

  ngOnInit() {
    
  }

  playStream(url: any) {
    this.audioService.playStream(url)
    .subscribe(events => {
      this.loading = null;

      type ObjectKey = keyof typeof events;
      const event = 'type' as ObjectKey;

      if (events![event] == 'ended') {
        this.next();
      }

    });
  }

  openFile(file: any, index: number) {    
    this.loading = index;
    this.currentFile = { index, file };
    this.audioService.stop();    
    this.cloudService.findById(file.id).subscribe({
      next: (song) => {
        const audioUrl = URL.createObjectURL(song);        
        this.playStream(audioUrl);
        this.checkVisited(index);
      },
      error: (v) => {
        this.isSelected = null;
        this.loading = null;
        this.state!.error = true;
      },
      complete: () => {
        this.loading = null;
        //console.info('complete and loading next');
        this.loadNext(index);
      }
    })
  }


  loadNext(index: number) {    
    //TODO
    //Implementar funcionalidad dependiendo de la experiencia de usuario
  }


  pause() {
    this.audioService.pause();
  }

  play() {

    if (!this.state?.playing) {
        this.openFile(this.files[0], 0);
    }
    
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    if (index <= this.files.length - 1) {
      const file = this.files[index];
      this.openFile(file, index);
      this.checkVisited(index);
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
    this.checkVisited(index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: { value: any; }) {
    this.audioService.seekTo(change.value);
  }

  public checkVisited(i:any) {
    this.isSelected = i;    
  }
  
}
