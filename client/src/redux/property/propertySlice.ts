import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyFormData } from "../../interfaces/ListPropertyDetails";

interface PropertyState {
    properties: PropertyFormData[];
}

const initialState: PropertyState = {
    properties: []
};

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setProperties(state, action: PayloadAction<PropertyFormData[]>) {
            state.properties = action.payload;
        },
        addProperty(state, action: PayloadAction<PropertyFormData>) {
            state.properties.push(action.payload);
        },
        updatedProperty(state, action: PayloadAction<{id:string, data: PropertyFormData}>){
            const index = state.properties.findIndex(p => p.id === action.payload.id);
            if(index !== -1) state.properties[index] = action.payload.data;
        },
        propertyStatus(state, action: PayloadAction<{id: string, isBlocked: boolean}>) {
            const property = state.properties.find((p) => p.id === action.payload.id);
            if(property) property.isBlocked = action.payload.isBlocked;
        },
        deleteProperty(state, action: PayloadAction<string>) {
            state.properties = state.properties.filter((p) => p.id !== action.payload);
        },
        resetProperties(state) {
            state.properties = [];
        }
    },
});

export const { setProperties, addProperty, updatedProperty, propertyStatus, deleteProperty, resetProperties } = propertySlice.actions;
export default propertySlice.reducer;