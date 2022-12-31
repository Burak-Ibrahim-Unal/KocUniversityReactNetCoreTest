using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities
{
    public class Messages
    {
        //Student Messages
        public static string StudentExists = "Student already exists";
        public static string StudentDoesNotExist = "Student does not exist";

        public static string StudentAdded = "Student is added successfuly";
        public static string UpdateStudent = "Student is updated successfuly";
        public static string DeleteStudent = "Student is deleted successfuly";

        public static string StudentIsNotDeleted = "Problem occurred while deleting student";
        public static string StudentIsNotUpdated = "Problem occurred while updating student";
        public static string StudentIsNotAdded = "Problem occurred while adding student";

        public static string StudentFirstNameValidation = "Student first name has to be not empty and minimum 2 characters";
        public static string StudentLastNameValidation = "Student last name has to be not empty and minimum 2 characters";
        public static string StudentNumberNameValidation = "Student number has to be not empty and unique";

        //Course Messages
        public static string CourseExists = "Course already exists";
        public static string CourseDoesNotExist = "Course does not exist";

        public static string CourseAdded = "Course is added successfuly";
        public static string UpdateCourse = "Course is updated successfuly";
        public static string DeleteCourse = "Course is deleted successfuly";

        public static string CourseIsNotDeleted = "Problem occurred while deleting course";
        public static string CourseIsNotUpdated = "Problem occurred while updating course";
        public static string CourseIsNotAdded = "Problem occurred while adding course";

        public static string CourseIdValidation = "Course first name has to be not empty and minimum 2 characters";
        public static string CourseNameValidation = "Course last name has to be not empty and minimum 2 characters";

        //CourseMatch Messages
        public static string CourseMatchExists = "Student can take same course once at the same time";
        public static string CourseMatchDoesNotExist = "CourseMatch does not exist";

        public static string CourseMatchAdded = "CourseMatch is added successfuly";
        public static string UpdateCourseMatch = "CourseMatch is updated successfuly";
        public static string DeleteCourseMatch = "CourseMatch is deleted successfuly";

        public static string CourseMatchIsNotDeleted = "Problem occurred while deleting courseMatch";
        public static string CourseMatchIsNotUpdated = "Problem occurred while updating courseMatch";
        public static string CourseMatchIsNotAdded = "Problem occurred while adding courseMatch";

        public static string CourseMatchStudentIdValidation = "CourseMatch product has to be not empty";
        public static string CourseMatchCourseIdValidation = "CourseMatch course has to be not empty";

    }
}
