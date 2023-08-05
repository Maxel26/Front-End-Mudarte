import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admi',
  templateUrl: './admi.component.html',
  styleUrls: ['./admi.component.css']
})
export class AdmiComponent implements OnInit {

  lista:string[]= ['estibas','huacales','cajas'];

  productsEstiba!: Array<Product>;  // Product 

  productForm : FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required
      ]
    ],
    image: [
      '',
      [],
    ],
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
    private router : Router
  ){}

  ngOnInit(): void {
    this.loadProductsByfamilies();
  }

  loadProductsByfamilies(){
    this.productsService.getProductsByFamily('estibas')
        .subscribe(products => {this.productsEstiba = products
          console.log(products); 
        });
  }

  createProduct(){
    console.group( 'productForm' );
    console.log( this.productForm.value );
    console.log( this.productForm.valid );
    console.groupEnd();

    this.productsService.createProduct(this.productForm.value)
      .subscribe((response) => {
        console.log(response);
      })

      this.productForm.reset();
      this.loadProductsByfamilies();
  }
}
