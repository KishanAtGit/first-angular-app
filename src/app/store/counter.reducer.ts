import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./counter.actions";

export const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, props) => {
        console.log(props);

        return state + 1
    }),
    on(decrement, (state, { msg }) => {
        console.log(msg);

        return state - Number(msg)
    }),
    on(reset, (state) => 0)
)