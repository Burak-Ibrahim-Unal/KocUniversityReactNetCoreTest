using Application.Features.CourseMatches.Dtos;
using Application.Features.Courses.Dtos;
using Application.Services.Repositories;
using AutoMapper;
using Core.Persistence.Pagination;
using Core.Persistence.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class CourseMatchRepository : EfRepositoryBase<CourseMatch, BaseDbContext>, ICourseMatchRepository
    {
        public CourseMatchRepository(BaseDbContext context) : base(context)
        {

        }
        public Task<CourseMatchDto> GetCourseMatchById(int id, CancellationToken cancellationToken = default)
        {
            var result = from courseMatch in Context.Coursematches
                         join course in Context.Courses
                         on courseMatch.CourseId equals course.Id
                         join student in Context.Students
                         on courseMatch.StudentId equals student.Id

                         where courseMatch.Id == id

                         select new CourseMatchDto
                         {
                             Id = courseMatch.Id,
                             StudentFirstName = student.FirstName,
                             StudentLastName = student.LastName,
                             StudentNumber = student.StudentNumber,
                             CourseId = course.CourseId,
                             CourseName = course.CourseName,
                         };

            return Task.FromResult(result.FirstOrDefault());
        }

        public async Task<PagedList<CourseMatchListDto>> GetAllCourseMatches(int index = 1, int size = 10, CancellationToken cancellationToken = default)
        {
            var result = from courseMatch in Context.Coursematches
                         join course in Context.Courses
                         on courseMatch.CourseId equals course.Id
                         join student in Context.Students
                         on courseMatch.StudentId equals student.Id

                         select new CourseMatchListDto
                         {
                             Id = courseMatch.Id,
                             StudentFirstName = student.FirstName,
                             StudentLastName = student.LastName,
                             StudentNumber = student.StudentNumber,
                             CourseId = course.CourseId,
                             CourseName = course.CourseName,
                         };
            return await PagedList<CourseMatchListDto>.ToPageListAsync(result, index, size);
        }
    }
}
