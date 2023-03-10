using Core.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Student : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? StudentNumber { get; set; }

        public Student()
        {

        }

        public Student(int id, string firstName, string lastName) : base(id)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
