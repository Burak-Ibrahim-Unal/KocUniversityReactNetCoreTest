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

namespace Application.Features.CourseMatches.Rules
{
    public class CourseMatchBusinessRules
    {
        ICourseMatchRepository _courseMatchRepository;

        public CourseMatchBusinessRules(ICourseMatchRepository courseMatchRepository)
        {
            _courseMatchRepository = courseMatchRepository;
        }

        //Gerkhin 
        //cross cutting concern
        public async Task CheckCourseMatchByCourseMatchId(int courseId, int studentId)
        {
            CourseMatch result = await _courseMatchRepository.GetAsync(courseMatch => courseMatch.CourseId == courseId && courseMatch.StudentId == studentId);

            if (result != null) throw new BusinessException(Messages.CourseMatchExists);
        }

        public async Task CheckCourseMatchById(int id)
        {
            CourseMatch result = await _courseMatchRepository.GetAsync(courseMatch => courseMatch.Id == id);

            if (result == null) throw new BusinessException(Messages.CourseMatchDoesNotExist);
        }
    }
}
