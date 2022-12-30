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
    public class CourseRepository : EfRepositoryBase<Course, BaseDbContext>, ICourseRepository
    {
        public CourseRepository(BaseDbContext context) : base(context)
        {

        }

        public Task<CourseDto?> GetCourseById(int id, CancellationToken cancellationToken = default)
        {
            var result = from course in Context.Courses
                         where course.Id == id

                         select new CourseDto
                         {
                             Id = course.Id,
                             CourseId=course.CourseId,
                             CourseName=course.CourseName,
                         };

            return Task.FromResult(result.FirstOrDefault());
        }

        public async Task<PagedList<CourseListDto>> GetAllCourses(int index = 1, int size = 10, CancellationToken cancellationToken = default)
        {
            var result = from course in Context.Courses

                         select new CourseListDto
                         {
                             Id = course.Id,
                             CourseId = course.CourseId,
                             CourseName = course.CourseName,
                         };
            return await PagedList<CourseListDto>.ToPageListAsync(result, index, size);
        }
    }
}
