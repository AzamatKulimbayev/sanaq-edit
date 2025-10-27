
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceSelectComponent } from './pages/source-select/source-select.component';
import { SearchComponent } from './pages/search/search.component';
import { HouseholdComponent } from './pages/household/household.component';
import {SanaqSearchComponent} from "./pages/sanaq-search/sanaq-search.component";
import {SanaqHouseholdComponent} from "./pages/sanaq-household/sanaq-household.component";

const routes: Routes = [
  { path: '', component: SourceSelectComponent },
  { path: 'search/:mode', component: SearchComponent },
  { path: 'sanaq-search/:mode', component: SanaqSearchComponent },
  { path: 'household/:mode/:id', component: HouseholdComponent },
  { path: 'sanaq-household/:mode/:id', component: SanaqHouseholdComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
