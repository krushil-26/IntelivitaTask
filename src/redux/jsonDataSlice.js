    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
    data: [],
    };

    const jsonDataSlice = createSlice({
    name: "jsonData",
    initialState,
    reducers: {
        addRecord: (state, action) => {
        const newData = action.payload;
        const existingEmails = new Set(state.data.map((record) => record.email));
        const filteredNewData = newData.filter(
            (record) => !existingEmails.has(record.email)
        );

        // Merge and remove duplicates
        state.data = [...state.data, ...filteredNewData];
        },
        updateRecord: (state, action) => {
        const { id, updatedRecord } = action.payload;
        const index = state.data.findIndex((record) => record.id === id);
        if (index !== -1) {
            state.data[index] = updatedRecord;
        }
        },
        deleteRecord: (state, action) => {
        state.data = state.data.filter((record) => record.id !== action.payload);
        },
    },
    });

    export const { addRecord, updateRecord, deleteRecord } = jsonDataSlice.actions;
    export default jsonDataSlice.reducer;
