import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { configs } from "../../config";
export const loginUser = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                `${configs.baseUrl}/user/login`,
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
export const registerUser = createAsyncThunk(
    "user/register",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                `${configs.baseUrl}/user`,
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
)
export const submitFormData = createAsyncThunk(
    "user",
    async (formData, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const userId = state.user.user._id
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((value, index) => {
                        formDataToSend.append(`${key}[${index}]`, value);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });
            console.log("formDataToSend", formDataToSend);
            const response = await axios.put(
                `${configs.baseUrl}/user/onboard/${userId}`,
                formDataToSend);
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
    message: null,
    registrationStatus: null
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
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        // nextStep: (state) => {
        //     if (state.currentStep < 3) state.currentStep += 1;
        // },
        previousStep: (state) => {
            if (state.currentStep > 1) state.currentStep -= 1;
        },
        logout: (state) => {
            state.loginStatus = "idle"
            state.error = null;
            state.message = null
            state.token = null
            state.user = []
            state.personalInfo = {}
            state.careerInfo = {}
            state.otherInfo = {}
            console.log("cleared!!!!!!!");
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loginStatus = "loading";
                console.log("Pending action:", action);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = null;
                state.loginStatus = "succeeded";
                console.log("fulfilled action:", action);
                const { payload } = action;
                state.message = payload.customMessage;
                const data = payload.payLoad
                state.token = data.jwToken
                state.user = data
                state.registrationStatus = data.registrationStatus

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginStatus = "failed";
                console.log("rejected action:", action);
                const { payload } = action;
                state.error = payload.customMessage;
            })
            .addCase(submitFormData.pending, (state, action) => {
                console.log("Pending action:", action);
                state.formStatus = "loading"
            })
            .addCase(submitFormData.fulfilled, (state, action) => {
                console.log("fulfilled action:", action);
                state.formStatus = "succeeded"
                const { payload } = action;
                state.message = payload.message;
                // Clear form state or redirect user
            })
            .addCase(submitFormData.rejected, (state, action) => {
                state.formStatus = 'failed';
                console.log("rejected action:", action);
                state.error = 'Please try again';
            })
            .addCase(registerUser.pending, (state, action) => {
                console.log("Pending action:", action);
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("fulfilled action:", action);
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("rejected action:", action);
            });
    }
});


export const user = (state) => state.user;
export const loginStatus = (state) => state.loginStatus;
export const message = (state) => state.message;
export const error = (state) => state.error;
export const { nextStep, previousStep, savecareerInfo, saveotherInfo, savepersonalInfo, logout, clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;
