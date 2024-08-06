import { Injectable } from '@angular/core';
import { Product } from '../_models/product.model';
// import { FileHandle } from 'fs/promises';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_models/filehandel.model';
// import { Product } from '../_models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(product: Product) {
    if (typeof window !== 'undefined') {
      const productImage: any = product.productImage;
      const imageBlob = this.dataURIBlob(productImage, "image/jpeg");

      const imageFile = new File([imageBlob], product.productName, { type: "image/jpeg" });

      const productImageToFileHandle: FileHandle = {
        file: imageFile,
        safeUrl: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      product.productImage = productImageToFileHandle;
      return product;
    }
    return product;
  }

  public dataURIBlob(picBytes: string, imageType: string) {
    const byteString = atob(picBytes);
    const mimeString = imageType;
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: mimeString });
    return blob;
  }

}
