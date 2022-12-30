using Core.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Course : Entity
    {
        public string CourseId { get; set; }
        public string CourseName { get; set; }

        public Course()
        {
                
        }

        public Course(int id,string courseId,string courseName) : base(id)
        {
            Id= id;
            CourseId= courseId;
            CourseName= courseName;
        }
    }
}
