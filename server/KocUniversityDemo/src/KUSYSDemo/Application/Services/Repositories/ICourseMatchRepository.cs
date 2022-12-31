using Application.Features.CourseMatches.Dtos;
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
    public interface ICourseMatchRepository : IAsyncRepository<CourseMatch>, ISyncRepository<CourseMatch>
    {
        Task<CourseMatchDto> GetCourseMatchById(int id, CancellationToken cancellationToken = default);
        Task<PagedList<CourseMatchListDto>> GetAllCourseMatches(int index = 1, int size = 10, CancellationToken cancellationToken = default);

    }
}
