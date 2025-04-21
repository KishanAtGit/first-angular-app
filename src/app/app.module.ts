import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { counterReducer } from "./store/counter.reducer";

@NgModule({
    imports: [
        StoreModule.forRoot({
            counter: counterReducer
        })
    ]
})

export class AppModule { }