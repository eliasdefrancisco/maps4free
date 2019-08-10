import { 
  Component,
  OnInit,
  Input
} from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-embed-map',
  templateUrl: './embed-map.component.html',
  styleUrls: ['./embed-map.component.scss'],
})
export class EmbedMapComponent implements OnInit {
  @Input() hideControls: boolean = true
  @Input() updatePositionSeconds: number = 0
  gMapSrcSanitized: SafeResourceUrl

  private set gMapSrc(url: string) {
    this.gMapSrcSanitized = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit() {
    this.setMap()
  }
  
  private setMap() {
    let lat = -6.09969875
    let lng = 36.6798263
    this.setUrlUbi(lat, lng)
    if(this.updatePositionSeconds > 0) {
      setInterval(() => {
        lat -= 0.002
        lng += 0.002
        this.setUrlUbi(lat, lng)
      }, this.updatePositionSeconds)
    }
  }
    
  private setUrlUbi(lat: number, lng: number) {
    this.gMapSrc = `\
      https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12799.114010794727\
      !2d${lat.toString()}\
      !3d${lng.toString()}\
      !2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1565373576240!5m2!1ses!2ses\
    `
  }

}
