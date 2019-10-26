import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthServiceService} from './auth-service.service';
import {LoginPage} from './login/login.page';
import {ComponentsModule} from './components/components.module';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicStorageModule} from '@ionic/storage';
import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        ComponentsModule,
        ReactiveFormsModule,
        BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        IonicStorageModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthServiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
