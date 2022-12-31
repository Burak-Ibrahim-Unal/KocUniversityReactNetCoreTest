import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setCourseParams } from "./courseSlice";

export default function CourseSearch() {
    const {courseParams} = useAppSelector(state => state.course);
    const [searchTerm, setSearchTerm] = useState(courseParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setCourseParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Search courses'
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