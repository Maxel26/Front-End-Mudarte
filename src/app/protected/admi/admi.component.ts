import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admi',
  templateUrl: './admi.component.html',
  styleUrls: ['./admi.component.css']
})
export class AdmiComponent implements OnInit {

  preview!: string;
  percentDone: any = 0;
  showTitle: boolean = true ;
  showInput: boolean = false;
  lista:string[]= ['estibas','huacales','cajas'];

  productsEstiba!: Array<Product>; 
  productsHuacales!: Array<Product>; 
  productsCajas!: Array<Product>; 

  productForm : FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required
      ]
    ],
    urlImage: [ null ],
    description: [
      '',
      []
    ],
    family:[
      '',
      []
    ]
  });

  constructor(
    private fb : FormBuilder,
    private productsService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadProductsByfamilies();
  }

  loadProductsByfamilies(){
    this.productsService.getProductsByFamily('estibas')
        .subscribe(products => {this.productsEstiba = products
          console.log(products); 
        });
    this.productsService.getProductsByFamily('huacales')
        .subscribe(products => {this.productsHuacales = products
          console.log(products);
        });
    this.productsService.getProductsByFamily('cajas')
        .subscribe(products => {this.productsCajas = products
          console.log(products);  
        });
  }

  createProduct(){
    // console.group( 'productForm' );
    // console.log( this.productForm.value );
    // console.log( this.productForm.valid );
    // console.groupEnd();

    this.productsService.createProduct(this.productForm.value)
      .subscribe((response) => {
        console.log(response);
      })

      this.productForm.reset();
      this.loadProductsByfamilies();
  }

  updateFile( event: any ) {
    const file = (event.target).files[ 0 ];

    this.productForm.patchValue({
      urlImage: file
    });

    this.productForm.get( 'urlImage' )?.updateValueAndValidity();

    /*** Leer el path del archivo para mostrar el preview */
    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL( file );
  }

  create2Product() {
    console.log( this.productForm.value )

    this.productsService.create2Product(
      this.productForm
    ).subscribe( ( event: HttpEvent<any> ) => {
      switch( event.type ) {
        case HttpEventType.Sent: 
          console.log( 'Peticion realizada!' );
          break;
        case HttpEventType.ResponseHeader: 
          console.log( 'La respuesta del \'header\' ha sido recibido!' );
          break;
        case HttpEventType.UploadProgress: 
          // this.percentDone = Math.round( event.loaded / event.total * 100 );
          // console.log( `Actualizado ${ this.percentDone }%` );
          console.log( `Actualizo` );
          break;
        case HttpEventType.Response: 
          console.log( 'El producto ha sido creado exitosamente!', event.body );
          this.percentDone = false;
          this.router.navigate( [ 'products' ] );
      }
    });

  }

  deleteProduct(productId : string | undefined){
    this.productsService.deleteProduct(productId )
      .subscribe( response => {
        console.log(response);
        this.loadProductsByfamilies();
      })
  }

  editProduct() {
    this.showInput = !this.showInput ;
    this.showTitle = !this.showTitle ;
  }
}
