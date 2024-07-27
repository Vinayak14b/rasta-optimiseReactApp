import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

const utilitySlice = createSlice({
    name: 'utility',
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setUtilityData(state, value) {
            state.utilityData = value.payload;
        }
    }
});

export const { setLoading, setUtilityData } = utilitySlice.actions;
export default utilitySlice.reducer;