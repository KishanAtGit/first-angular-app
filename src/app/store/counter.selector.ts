import { createSelector, createFeatureSelector } from "@ngrx/store";

export const selectCounter = createFeatureSelector<number>('counter');

export const selectCounterValue = createSelector(selectCounter, (state) => state + 1);