import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { AddProductComponent } from './add-product/add-product.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ShowProductComponent } from './show-product/show-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { ShowStockComponent } from './show-stock/show-stock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';

import { ReturnOrderComponent } from './return-order/return-order.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
// import { ShowPurchasesComponent } from './modules/admin/components/show-purchases/show-purchases.component';
// import { ShowSalesComponent } from './modules/admin/components/show-sales/show-sales.component';
// import { ShowCustomerComponent } from './modules/admin/components/show-customer/show-customer.component';
// import { ToastrModule } from 'ngx-toastr'
// import { PapaParseModule } from 'ngx-papaparse';

import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './auth/services/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    AddProductComponent,
    ShowProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    SpecialOfferComponent,
    AddSupplierComponent,
    ReturnStockComponent,
    ShowStockComponent,
    EditProductComponent,
    CustomerOrderComponent,
    PendingOrderComponent,
    ReturnOrderComponent,
    CompletedOrderComponent,
    SignInComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatStepperModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    authInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
