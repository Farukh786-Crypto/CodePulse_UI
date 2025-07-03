import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { QrcodeService } from "../../services/qrcode.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-qrcode",
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: "./qrcode.component.html",
  styleUrl: "./qrcode.component.scss",
})
export class QRCodeComponent {
  qrText: string = "Hello World!"; // Default text for QR code
  qrcodeImage!: string;

  @ViewChild("qrModal") qrModal!: ElementRef;

  constructor(
    private qrcodeService: QrcodeService,
    @Inject(PLATFORM_ID) private platformId: Object // Injecting platformId
  ) {}

  generateQRCode() {
    this.qrcodeService.showQRCode(this.qrText).subscribe({
      next: (response) => {
        if (response.success) {
          this.qrcodeImage = response.data;
        }
      },
      error: (error) => {
        console.error("Error generating QR code:", error);
      },
      complete: () => {
        if (isPlatformBrowser(this.platformId)) {
          import("bootstrap").then((bootstrap) => {
            const modal = new bootstrap.Modal(this.qrModal.nativeElement);
            modal.show();
          });
        }
      },
    });
  }
}
