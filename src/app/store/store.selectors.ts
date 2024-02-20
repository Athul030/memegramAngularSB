import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { DpState } from "./store.reducer";



export const selectDpState = createFeatureSelector<DpState>('dp');

export const selectImageUrl = createSelector(
    selectDpState,
    (state:DpState) =>state.imageUrl
)