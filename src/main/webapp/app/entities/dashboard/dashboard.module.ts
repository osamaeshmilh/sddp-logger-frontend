import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { dashboardRoute } from './';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'app/shared/shared.module';

const ENTITY_STATES = [...dashboardRoute];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ENTITY_STATES), ChartsModule],
  declarations: [DashboardComponent],
  entryComponents: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
