import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { CourseMatch, CourseMatchParams } from "../../app/models/courseMatch";

interface CourseMatchState {
    courseMatchesLoaded: boolean;
    status: string;
    courseMatchParams: CourseMatchParams;
    metaData: MetaData | null;
}

const courseMatchesAdapter = createEntityAdapter<CourseMatch>();

function getAxiosParams(courseMatchParams: CourseMatchParams) {
    const params = new URLSearchParams();
    params.append('currentPage', courseMatchParams.currentPage.toString());
    params.append('pageSize', courseMatchParams.pageSize.toString());
    if (courseMatchParams.searchTerm) params.append('searchTerm', courseMatchParams.searchTerm);
    return params;
}

export const fetchCourseMatchesAsync = createAsyncThunk<CourseMatch[], void, { state: RootState }>(
    'courseMatch/fetchCourseMatchesAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().courseMatch.courseMatchParams);
        try {
            const response = await agent.CourseMatch.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            console.log(response.metaData);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchCourseMatchAsync = createAsyncThunk<CourseMatch, number>(
    'courseMatch/fetchCourseMatchAsync',
    async (courseMatchId, thunkAPI) => {
        try {
            return await agent.CourseMatch.details(courseMatchId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        currentPage: 1,
        pageSize: 50,
        orderBy: 'lastName',
    }
}

export const courseMatchSlice = createSlice({
    name: 'courseMatch',
    initialState: courseMatchesAdapter.getInitialState<CourseMatchState>({
        courseMatchesLoaded: false,
        status: 'idle',
        courseMatchParams: initParams(),
        metaData: null
    }),
    reducers: {
        setCourseMatchParams: (state, action) => {
            state.courseMatchesLoaded = false;
            state.courseMatchParams = { ...state.courseMatchParams, ...action.payload, currentPage: 1 };
        },
        setcurrentPage: (state, action) => {
            state.courseMatchesLoaded = false;
            state.courseMatchParams = { ...state.courseMatchParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetCourseMatchParams: (state) => {
            state.courseMatchParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCourseMatchesAsync.pending, (state) => {
            state.status = 'pendingFetchCourseMatches';
        });
        builder.addCase(fetchCourseMatchesAsync.fulfilled, (state, action) => {
            courseMatchesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.courseMatchesLoaded = true;
        });
        builder.addCase(fetchCourseMatchesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCourseMatchAsync.pending, (state) => {
            state.status = 'pendingFetchCourseMatch';
        });
        builder.addCase(fetchCourseMatchAsync.fulfilled, (state, action) => {
            courseMatchesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCourseMatchAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
})

export const courseMatchSelectors = courseMatchesAdapter.getSelectors((state: RootState) => state.courseMatch);

export const { setCourseMatchParams, resetCourseMatchParams, setMetaData, setcurrentPage } = courseMatchSlice.actions;