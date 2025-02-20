import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PropertyData {
    id: string;
    isBlocked: boolean;
    basicInfo: {
      propertyName: string;
    };
    mediaUrls: string[];
    pricing: {
      price: string;
      availability: string;
    };
  }
  

interface PropertyState {
    properties: PropertyData[];
}

const initialState: PropertyState = {
    properties: []
};

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setProperties(state, action: PayloadAction<PropertyData[]>) {
            state.properties = action.payload;
        },
        addProperty(state, action: PayloadAction<PropertyData>) {
            state.properties.push(action.payload);
        },
        updatedProperty(state, action: PayloadAction<{id:string, data: PropertyData}>){
            const index = state.properties.findIndex(p => p.id === action.payload.id);
            if(index !== -1) state.properties[index] = action.payload.data;
        },
        propertyStatus(state, action: PayloadAction<{id: string, isBlocked: boolean}>) {
            const property = state.properties.find((p) => p.id === action.payload.id);
            if(property) property.isBlocked = action.payload.isBlocked;
        },
    },
});

export const { setProperties, addProperty, updatedProperty, propertyStatus } = propertySlice.actions;
export default propertySlice.reducer;