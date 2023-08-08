import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  productsEstibas!: Array<Product>; 
  productsHuacales!: Array<Product>; 
  productsCajas!: Array<Product>; 

  constructor(
    private productsService : ProductService
  ){}

  ngOnInit(): void {
      this.loadProductsByfamilies();
  }

  loadProductsByfamilies(){
    this.productsService.getProductsByFamily('estibas')
        .subscribe(products => {this.productsEstibas = products
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
}
