using Application.Features.Courses.Dtos;
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
    public interface ICourseRepository : IAsyncRepository<Course>, ISyncRepository<Course>
    {
        Task<CourseDto> GetCourseById(int id, CancellationToken cancellationToken = default);
        Task<PagedList<CourseListDto>> GetAllCourses(int index = 1, int size = 10, CancellationToken cancellationToken = default);

    }
}
