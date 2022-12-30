using Application.Features.Courses.Dtos;
using Core.Persistence.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Courses.Models
{
    public class CourseListModel : MetaData
    {
        public IList<CourseListDto> Items { get; set; }
    }
}
