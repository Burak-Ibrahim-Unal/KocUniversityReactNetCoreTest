using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Utilities;
using FluentValidation;

namespace Application.Features.Courses.Commands
{
    public class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
    {
        public CreateCourseCommandValidator()
        {
            RuleFor(c => c.CourseId)
                .NotEmpty()
                .MinimumLength(2)
                .WithMessage(Messages.CourseIdValidation);

            RuleFor(c => c.CourseName)
                .NotEmpty()
                .MinimumLength(2)
                .WithMessage(Messages.CourseNameValidation);
        }
    }
}