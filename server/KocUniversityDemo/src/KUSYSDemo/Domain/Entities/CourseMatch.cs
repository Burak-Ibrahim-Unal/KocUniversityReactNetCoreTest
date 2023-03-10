using Core.Persistence.Repositories;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CourseMatch : Entity
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public virtual Student Student { get; set; }
        public virtual Course Course { get; set; }

        public CourseMatch()
        {

        }

        public CourseMatch(int id, int studentId, int courseId) : base(id)
        {
            Id = id;
            StudentId = studentId;
            CourseId = courseId;
        }
    }
}
