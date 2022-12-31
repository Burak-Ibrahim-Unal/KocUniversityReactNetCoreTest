using Application.Features.CourseMatches.Dtos;
using Core.Persistence.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CourseMatches.Models
{
    public class CourseMatchListModel : MetaData
    {
        public IList<CourseMatchListDto> Items { get; set; }
    }
}
