import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

import { AddProductComponent } from './add-product/add-product.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { ShowStockComponent } from './show-stock/show-stock.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';

import { ReturnOrderComponent } from './return-order/return-order.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';
import { adminGuard } from './auth/services/guards/auth.guard';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-dashboard/admin-home', pathMatch: 'full' }, // Default route

  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: "add-product", component: AddProductComponent },
      { path: "admin-home", component: AdminHomeComponent },
      { path: "add-supplier", component: AddSupplierComponent },
      { path: "delete-product", component: DeleteProductComponent },
      { path: "return-stock", component: ReturnStockComponent },
      { path: "show-product", component: ShowProductComponent },
      { path: "show-stock", component: ShowStockComponent },
      { path: "special-offer", component: SpecialOfferComponent },
      { path: "update-product", component: UpdateProductComponent },
      { path: "edit-product", component: EditProductComponent },
      { path: "customer-order", component: CustomerOrderComponent },
      { path: "pending-order", component: PendingOrderComponent },
      { path: "completed-order", component: CompletedOrderComponent },

      { path: "return-order", component: ReturnOrderComponent }
    ]

  },
  {
    path: "sign-in",
    component: SignInComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
