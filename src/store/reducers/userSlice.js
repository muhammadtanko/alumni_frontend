import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
);
export const submitFormData = createAsyncThunk(
    "user",
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post('/user', formData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })





const initialState = {
    loginStatus: "idle",
    token: null,
    formStatus: "idle",
    currentStep: 1,
    user: [],
    personalInfo: {},
    careerInfo: {},
    otherInfo: {},
    error: null,
    message: null
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        savepersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
            state.currentStep = 2;
        },
        savecareerInfo: (state, action) => {
            state.careerInfo = action.payload;
            state.currentStep = 3;
        },
        saveotherInfo: (state, action) => {
            state.otherInfo = action.payload;
            state.currentStep = 4;
        },
        nextStep: (state) => {
            if (state.currentStep < 3) state.currentStep += 1;
        },
        previousStep: (state) => {
            if (state.currentStep > 1) state.currentStep -= 1;
        },
        logout: (state) => {
            state.loginStatus = "idle"
            state.error= null;
            state.message = null
            state.token = null
            state.user = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loginStatus = "loading";
                console.log("Pending action:", action);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginStatus = "succeeded";
                console.log("fulfilled action:", action);
                const { payload } = action;
                state.message = payload.customMessage;
                const data = payload.payLoad
                console.log("data", data);
                state.token = data.jwToken
                state.user = data
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginStatus = "failed";
                console.log("rejected action:", action);
                const { payload } = action;
                state.error = payload.customMessage;
            })
            .addCase(submitFormData.pending, (state, action) => {
                state.formStatus = "loading"
            })
            .addCase(submitFormData.fulfilled, (state, action) => {
                state.formStatus = "succeeded"
                // Clear form state or redirect user
            })
            .addCase(submitFormData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});


export const user = (state) => state.user;
export const loginStatus = (state) => state.loginStatus;
export const message = (state) => state.message;
export const error = (state) => state.error;
export const { nextStep, previousStep, savecareerInfo, saveotherInfo, savepersonalInfo, logout } = userSlice.actions;
export default userSlice.reducer;
