import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { DpState } from "./store.reducer";
import { UserPresenceState } from "./store.state";
import { FlexibleConnectedPositionStrategy } from "@angular/cdk/overlay";



export const selectDpState = createFeatureSelector<DpState>('dp');

export const selectImageUrl = createSelector(
    selectDpState,
    (state:DpState) =>state.imageUrl
)

// export const selectUserPresenceState = createFeatureSelector<UserPresenceState>('userPresence');
// export const selectUserIds = createSelector(
//     selectUserPresenceState,
//     (state:UserPresenceState) => state.userIds || []
// );