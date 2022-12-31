import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setStudentParams } from "./studentSlice";

export default function StudentSearch() {
    const {studentParams} = useAppSelector(state => state.student);
    const [searchTerm, setSearchTerm] = useState(studentParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setStudentParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Search students'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}