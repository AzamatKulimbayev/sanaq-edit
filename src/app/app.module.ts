import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SourceSelectComponent} from './pages/source-select/source-select.component';
import {SearchComponent} from './pages/search/search.component';
import {HouseholdComponent, EditDialogComponent, HistoryDialogComponent} from './pages/household/household.component';
import {SanaqSearchComponent} from "./pages/sanaq-search/sanaq-search.component";

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {SanaqHouseholdComponent}  from "./pages/sanaq-household/sanaq-household.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LandComponent} from "./pages/sanaq-household/land/land.component";
import {SanaqEditDialogComponent} from "./shared/dialogs/sanaq-edit-dialog.component";
import {SanaqHistoryDialogComponent} from "./shared/dialogs/sanaq-history-dialog.component";


@NgModule({
    declarations: [
        AppComponent,
        SourceSelectComponent,
        SearchComponent,
        HouseholdComponent,
        EditDialogComponent,
        HistoryDialogComponent,
        SanaqSearchComponent,
        SanaqHouseholdComponent,
        SanaqEditDialogComponent,
        SanaqHistoryDialogComponent
    ],
    imports: [
        BrowserModule,

        MatButtonToggleModule,
        MatFormFieldModule,


        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        AppRoutingModule,
        MatButtonModule, MatInputModule, MatIconModule, MatCardModule, MatTabsModule,
        MatTableModule, MatDialogModule, MatSelectModule, MatBadgeModule, MatTooltipModule,
        MatRippleModule,
        HttpClientModule, MatProgressSpinner, LandComponent

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

