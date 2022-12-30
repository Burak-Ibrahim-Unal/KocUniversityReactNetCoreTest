using Application.Features.Students.Dtos;
using Core.Persistence.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Students.Models
{
    public class StudentListModel : MetaData
    {
        public IList<StudentListDto> Items { get; set; }
    }
}
