import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppRoutingModule } from './app.routes';

// AWS Specific
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

// Components
import { AppComponent } from './app.component';

// Components - Common
// import { PrettyJsonComponent } from './common/components/pretty-json/pretty-json.component';

// Components - Public
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/auth/login/login.component';
import {
    LogoutComponent,
    RegistrationConfirmationComponent
} from './public/auth/confirm/confirm-registration.component';
import { ResendCodeComponent } from './public/auth/resend/resend-code.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component } from './public/auth/forgot/forgot-password.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { NewPasswordComponent } from './public/auth/newpassword/new-password.component';
// Components - Secure - Common
import { GenericTableComponent } from './secure/common/generic-table.component';
import { IoTPubSuberComponent } from './secure/common/iot-pubsuber.component';
import { PrettifierComponent } from './secure/common/prettifier.component';
import { SecureHomeCommonComponent } from './secure/common/secure-home-common.component';
// Components - Secure
import { DeploymentsComponent } from './secure/deployments/deployments.component';
import { DeviceComponent } from './secure/device/device.component';
import { DevicesComponent } from './secure/devices/devices.component';
// import { DeviceBlueprintComponent } from './secure/device-blueprint/device-blueprint.component';
import { DeviceBlueprintsComponent } from './secure/device-blueprints/device-blueprints.component';
// import { DeviceTypeComponent } from './secure/device-type/device-type.component';
import { DeviceTypesComponent } from './secure/device-types/device-types.component';
import { MapsComponent } from './secure/maps/maps.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { SecureHomeComponent } from './secure/home/secure-home.component';
import { SettingsComponent } from './secure/settings/settings.component';
import { SolutionComponent } from './secure/solution/solution.component';
import { SolutionsComponent } from './secure/solutions/solutions.component';
import { SolutionBlueprintsComponent } from './secure/solution-blueprints/solution-blueprints.component';
import { UserComponent } from './secure/users/user.component';
import { UsersComponent } from './secure/users/users.component';

// Sub Components // TODO: this needs to change because of mis-understanding of how angular works
import { DeviceBlueprintsModalComponent } from './secure/device-blueprints/device-blueprints.modal.component';
// import { DeviceTypesModalComponent } from './secure/device-types/device-types.modal.component';
import { SolutionEditModalComponent } from './secure/solution/solution.edit.modal.component';
import { SolutionsModalComponent } from './secure/solutions/solutions.modal.component';
import { SolutionBlueprintsModalComponent } from './secure/solution-blueprints/solution-blueprints.modal.component';

// Directives

// Pipes
import { PipesModule } from './pipes/pipes.module';

// Services
import { AppServicesModule } from './services/services.module';
import { LoggerService, ConsoleLoggerService } from './services/logger.service';

// Common Modules
import { GaugeModule } from './common/modules/gauge/gauge.module';
import { TableModule } from './common/modules/table/table.module';

// Secure Modules
import { DeviceTypesModule } from './secure/device-types/device-types.module';

// Solution Modules
import { ChildViewsModule } from '@solutions/child-views.module';



@NgModule({
    declarations: [
        AppComponent,

        // Components - Common
        // PrettyJsonComponent,

        // Components - Public
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        NewPasswordComponent,
        HomeComponent,

        // Components - Secure - Common
        GenericTableComponent,
        IoTPubSuberComponent,
        PrettifierComponent,

        // Components - Secure
        DeploymentsComponent,
        DeviceComponent,
        DevicesComponent,
        // DeviceBlueprintComponent,
        DeviceBlueprintsComponent,
        // DeviceTypeComponent,
        // DeviceTypesComponent,
        MapsComponent,
        ProfileComponent,
        SecureHomeCommonComponent,
        SecureHomeComponent,
        SettingsComponent,
        SolutionComponent,
        SolutionsComponent,
        SolutionBlueprintsComponent,
        UserComponent,
        UsersComponent,

        // Sub Components
        DeviceBlueprintsModalComponent,
        // DeviceTypesModalComponent,
        SolutionEditModalComponent,
        SolutionsModalComponent,
        SolutionBlueprintsModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,

        AppRoutingModule,

        // Common
        ChildViewsModule,
        GaugeModule,
        TableModule,

        // Secure
        DeviceTypesModule,

        BlockUIModule.forRoot(),
        SweetAlert2Module
            .forRoot
            //   {
            //   buttonsStyling: false,
            //   customClass: 'modal-content',
            //   confirmButtonClass: 'btn btn-primary',
            //   cancelButtonClass: 'btn'
            // }
            (),

        // Pipes
        PipesModule,

        // Services
        AppServicesModule

        // .forRoot()
    ],
    providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }],
    bootstrap: [AppComponent],
    entryComponents: [
        DeviceBlueprintsModalComponent,
        // DeviceTypesModalComponent,
        SolutionEditModalComponent,
        SolutionsModalComponent,
        SolutionBlueprintsModalComponent
    ]
})
export class AppModule {}
