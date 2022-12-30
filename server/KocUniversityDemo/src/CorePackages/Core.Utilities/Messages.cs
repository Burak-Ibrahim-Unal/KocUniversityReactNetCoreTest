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
        public static string StudentBirthDateNameValidation = "Student birthDate has to be less then today";


   
    }
}
