import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetDataComponent } from './components/get-data/get-data.component';
import { BodyComponent } from './container/body/body.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './container/header/header.component';
import { PostComponent } from './components/post/post.component';
import { RestInServiceComponent } from './components/rest-in-service/rest-in-service.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { HeadersComponent } from './components/headers/headers.component';
import { InterseptorsComponent } from './components/interseptors/interseptors.component';
import { AuthInterceptor } from './components/interseptors/auth-interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  /** позволяет иметь больше одного интерсептора в приложении */
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    BodyComponent,
    GetDataComponent,
    PostComponent,
    RestInServiceComponent,
    ErrorsComponent,
    HeadersComponent,
    InterseptorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
