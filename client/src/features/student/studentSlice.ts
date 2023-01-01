import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Student, StudentParams } from "../../app/models/student";

interface StudentState {
    studentsLoaded: boolean;
    status: string;
    studentParams: StudentParams;
    metaData: MetaData | null;
}

const studentsAdapter = createEntityAdapter<Student>();

function getAxiosParams(studentParams: StudentParams) {
    const params = new URLSearchParams();
    params.append('currentPage', studentParams.currentPage.toString());
    params.append('pageSize', studentParams.pageSize.toString());
    if (studentParams.searchTerm) params.append('searchTerm', studentParams.searchTerm);
    return params;
}

export const fetchStudentsAsync = createAsyncThunk<Student[], void, { state: RootState }>(
    'student/fetchStudentsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().student.studentParams);
        try {
            const response = await agent.Student.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            console.log(response.metaData);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchStudentAsync = createAsyncThunk<Student, number>(
    'student/fetchStudentAsync',
    async (studentId, thunkAPI) => {
        try {
            return await agent.Student.details(studentId);
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

export const studentSlice = createSlice({
    name: 'student',
    initialState: studentsAdapter.getInitialState<StudentState>({
        studentsLoaded: false,
        status: 'idle',
        studentParams: initParams(),
        metaData: null
    }),
    reducers: {
        setStudentParams: (state, action) => {
            state.studentsLoaded = false;
            state.studentParams = { ...state.studentParams, ...action.payload, currentPage: 1 };
        },
        setCurrentPage: (state, action) => {
            state.studentsLoaded = false;
            state.studentParams = { ...state.studentParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetStudentParams: (state) => {
            state.studentParams = initParams();
        },
        setStudent: (state, action) => {
            studentsAdapter.updateOne(state, action.payload);
            state.studentsLoaded = false;
        },
        removeStudent: (state, action) => {
            studentsAdapter.removeOne(state, action.payload);
            state.studentsLoaded = false;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchStudentsAsync.pending, (state) => {
            state.status = 'pendingFetchStudents';
        });
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
            studentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.studentsLoaded = true;
        });
        builder.addCase(fetchStudentsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchStudentAsync.pending, (state) => {
            state.status = 'pendingFetchStudent';
        });
        builder.addCase(fetchStudentAsync.fulfilled, (state, action) => {
            studentsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchStudentAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
})

export const studentSelectors = studentsAdapter.getSelectors((state: RootState) => state.student);

export const { setStudentParams, resetStudentParams, setMetaData, setCurrentPage, setStudent, removeStudent } = studentSlice.actions;