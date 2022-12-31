using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Utilities;
using FluentValidation;

namespace Application.Features.CourseMatches.Commands
{
    public class UpdateCourseMatchCommandValidator : AbstractValidator<UpdateCourseMatchCommand>
    {
        public UpdateCourseMatchCommandValidator()
        {
            RuleFor(c => c.CourseId)
                .NotEmpty()
                .WithMessage(Messages.CourseMatchCourseIdValidation);

            RuleFor(c => c.StudentId)
                .NotEmpty()
                .WithMessage(Messages.CourseMatchStudentIdValidation);
        }
    }
}