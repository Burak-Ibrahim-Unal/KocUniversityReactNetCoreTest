import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setCourseMatchParams } from "./courseMatchSlice";

export default function CourseMatchSearch() {
    const {courseMatchParams} = useAppSelector(state => state.courseMatch);
    const [searchTerm, setSearchTerm] = useState(courseMatchParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setCourseMatchParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Search courseMatches'
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