using Application.Services.Repositories;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Persistence.Pagination;
using Core.Utilities;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Courses.Rules
{
    public class CourseBusinessRules
    {
        ICourseRepository _courseRepository;

        public CourseBusinessRules(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        //Gerkhin 
        //cross cutting concern
        public async Task CheckCourseByCourseId(string courseId)
        {
            Course result = await _courseRepository.GetAsync(course => course.CourseId == courseId);

            if (result == null) throw new BusinessException(Messages.CourseDoesNotExist);
        }    
        
        public async Task CheckCourseByCourseIdForCreate(string courseId)
        {
            Course result = await _courseRepository.GetAsync(course => course.CourseId == courseId);

            if (result != null) throw new BusinessException(Messages.CourseExists);
        }

        public async Task CheckCourseById(int id)
        {
            Course result = await _courseRepository.GetAsync(course => course.Id == id);

            if (result == null) throw new BusinessException(Messages.CourseDoesNotExist);
        }  
    }
}
