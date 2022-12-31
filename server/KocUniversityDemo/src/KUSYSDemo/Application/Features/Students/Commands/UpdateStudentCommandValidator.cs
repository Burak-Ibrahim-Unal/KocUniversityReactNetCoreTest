using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Utilities;
using FluentValidation;

namespace Application.Features.Students.Commands
{
    public class UpdateStudentCommandValidator : AbstractValidator<UpdateStudentCommand>
    {
        public UpdateStudentCommandValidator()
        {
            RuleFor(c => c.FirstName)
                .NotEmpty()
                .MinimumLength(2)
                .WithMessage(Messages.StudentFirstNameValidation);

            RuleFor(c => c.LastName)
                .NotEmpty()
                .MinimumLength(2)
                .WithMessage(Messages.StudentLastNameValidation);

            RuleFor(c => c.StudentNumber)
                .NotEmpty()
                .WithMessage(Messages.StudentNumberNameValidation);

        }
    }
}