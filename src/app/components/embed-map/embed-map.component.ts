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
  @Input() showLocator: boolean = true
  @Input() updatePositionSeconds: number = 10
  gMapSrcSanitized_0: SafeResourceUrl
  gMapSrcSanitized_1: SafeResourceUrl
  iframeSwitcher: boolean = true
  iframeSwitcherShow: boolean = true
  iframeIntervalTime = 3000
  isFirstTime = true
  visLocator = false

  private set gMapSrc(url: string) {
    const gMapSrcSanitized = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    if (this.isFirstTime) {
      this.gMapSrcSanitized_1 = gMapSrcSanitized
      this.gMapSrcSanitized_0 = gMapSrcSanitized
      this.isFirstTime = false
    }
    else {
      if (this.iframeSwitcher) {
        this.gMapSrcSanitized_1 = gMapSrcSanitized
      }
      else {
        this.gMapSrcSanitized_0 = gMapSrcSanitized
      }
      setTimeout(() => {
        this.iframeSwitcher = !this.iframeSwitcher
        setTimeout(() => {
          this.iframeSwitcherShow = !this.iframeSwitcherShow
        }, this.iframeIntervalTime)
      }, this.iframeIntervalTime)
    }
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit() {
    this.initMap()
    this.initLocator()
  }

  private initLocator() {
    if(this.showLocator){
      setTimeout(() => this.visLocator = true, this.iframeIntervalTime)
    }
  }
  
  private initMap() {
    let lat = -6.09969875
    let lng = 36.6798263
    this.setUrlUbi(lat, lng)
    if(this.updatePositionSeconds > 0) {
      setInterval(() => {
        lat -= 0.0005
        lng += 0.0005
        this.setUrlUbi(lat, lng)
      }, this.updatePositionSeconds * 1000 + this.iframeIntervalTime * 2)
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
