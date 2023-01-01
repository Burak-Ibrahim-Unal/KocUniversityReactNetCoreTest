import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Course, CourseParams } from "../../app/models/course";

interface CourseState {
    coursesLoaded: boolean;
    status: string;
    courseParams: CourseParams;
    metaData: MetaData | null;
}

const coursesAdapter = createEntityAdapter<Course>();

function getAxiosParams(courseParams: CourseParams) {
    const params = new URLSearchParams();
    params.append('currentPage', courseParams.currentPage.toString());
    params.append('pageSize', courseParams.pageSize.toString());
    if (courseParams.searchTerm) params.append('searchTerm', courseParams.searchTerm);
    return params;
}

export const fetchCoursesAsync = createAsyncThunk<Course[], void, { state: RootState }>(
    'course/fetchCoursesAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().course.courseParams);
        try {
            const response = await agent.Course.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchCourseAsync = createAsyncThunk<Course, number>(
    'course/fetchCourseAsync',
    async (courseId, thunkAPI) => {
        try {
            return await agent.Course.details(courseId);
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

export const courseSlice = createSlice({
    name: 'course',
    initialState: coursesAdapter.getInitialState<CourseState>({
        coursesLoaded: false,
        status: 'idle',
        courseParams: initParams(),
        metaData: null
    }),
    reducers: {
        setCourseParams: (state, action) => {
            state.coursesLoaded = false;
            state.courseParams = { ...state.courseParams, ...action.payload, currentPage: 1 };
        },
        setcurrentPage: (state, action) => {
            state.coursesLoaded = false;
            state.courseParams = { ...state.courseParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetCourseParams: (state) => {
            state.courseParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCoursesAsync.pending, (state) => {
            state.status = 'pendingFetchCourses';
        });
        builder.addCase(fetchCoursesAsync.fulfilled, (state, action) => {
            coursesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.coursesLoaded = true;
        });
        builder.addCase(fetchCoursesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCourseAsync.pending, (state) => {
            state.status = 'pendingFetchCourse';
        });
        builder.addCase(fetchCourseAsync.fulfilled, (state, action) => {
            coursesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCourseAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
})

export const courseSelectors = coursesAdapter.getSelectors((state: RootState) => state.course);

export const { setCourseParams, resetCourseParams, setMetaData, setcurrentPage } = courseSlice.actions;