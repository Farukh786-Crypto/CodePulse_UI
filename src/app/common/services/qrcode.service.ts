import { Injectable } from "@angular/core";
import { HttpService } from "../../features/category/Services";
import { GenerateQR } from "../Models/GenerateQR.model";
import { Observable } from "rxjs";
import { GenerateCodeResponse } from "../Models/GenerateCodeResponse.model";

@Injectable({
  providedIn: "root",
})
export class QrcodeService {
  constructor(private https: HttpService) {}

  showQRCode(qrCodeText: string): Observable<GenerateCodeResponse> {
    return this.https.post<GenerateCodeResponse>("CreateQR", {
      qrCodeText,
    });
  }
}
