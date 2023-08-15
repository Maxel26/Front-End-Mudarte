import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../interfaces/product.interface';
import { ProductResponse } from '../interfaces/product-response.interface';
import { Observable,map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL : string = environment.baseUrl ;
  token! : string;
  headers! : HttpHeaders
  constructor(
    private http : HttpClient
  ) { 
    const token = localStorage.getItem('token');
    this.token = token ? token : '';
    this.headers = new HttpHeaders().set('X-token', `${this.token}`) 
  }

  createProduct(product : Product){
    return this.http.post(
      `${this.BASE_URL}/products`,
      product,
      {headers: this.headers}
    )
  }

  create2Product( productForm: any ) : Observable<any> {
    const formData = new FormData();
    // formData.append('file', this.uploadForm.get('profile').value);

    formData.append( 'name', productForm.get( 'name' ).value );
    formData.append( 'description', productForm.get( 'description' ).value );
    formData.append( 'family', productForm.get( 'family' ).value );
    formData.append( 'urlImage', productForm.get( 'urlImage' ).value  );

    console.log( '<<<<<<', formData );

    return this.http.post<Product>(
      `${ this.BASE_URL }/products`,      // URL del BackEnd al que debemos hacer la peticion
      formData,                            // Objeto de producto a crear
      {                                   // Cabeceras con información requerida 
        headers: this.headers,
        reportProgress: false,
        observe: 'events'
      }
    );
  }

  updateProduct(productId : string, product: Product){
    return this.http.patch(
      `${this.BASE_URL}/products/${productId}`,
      product,
      {headers: this.headers}
    )
  }

  deleteProduct(userId : string | undefined){
    return this.http.delete(
      `${this.BASE_URL}/products/${userId}`,
      {headers: this.headers}
    )
  }

  getProductsByFamily(family:string){
    return this.http.get<ProductResponse>(`${this.BASE_URL}/products/family/${family}`)
      .pipe(
        tap((response)=> console.log(response)),
        map((response)=> response['products'])
      )
  }
}
