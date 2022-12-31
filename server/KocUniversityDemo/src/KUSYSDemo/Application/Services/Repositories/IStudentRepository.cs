using Application.Features.Students.Dtos;
using Core.Persistence.Pagination;
using Core.Persistence.Repositories;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Repositories
{
    public interface IStudentRepository : IAsyncRepository<Student>, ISyncRepository<Student>
    {
        Task<StudentDto> GetStudentById(int id, CancellationToken cancellationToken = default);
        Task<PagedList<StudentListDto>> GetAllStudents(int index = 1, int size = 10, CancellationToken cancellationToken = default);

    }
}
