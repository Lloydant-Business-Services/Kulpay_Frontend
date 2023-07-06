import { createSlice } from "@reduxjs/toolkit";

export const InstitutionSlice = createSlice({
    name:"institution",
    initialState:{
        institution:null
    },
    reducers:{
        init__institution:(state, action) => {
            state.institution = action.payload
        }
    }
})

export const {init__institution} = InstitutionSlice.actions;
export const selectUser = (state) => state.institution;
export default InstitutionSlice.reducer;