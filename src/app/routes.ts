import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { TestSubjectComponent } from "./test-subject/test-subject.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Home page"
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: "Details page"
    },
    {
        path: 'test-subject',
        component: TestSubjectComponent,
        title: "Test Subject"
    }

]

export default routeConfig;