using Application.Features.Students.Dtos;
using Application.Features.Students.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Utilities;
using Domain.Entities;
using MediatR;

namespace Application.Features.Students.Commands;

public class UpdateStudentCommand : IRequest<UpdateStudentDto>
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? StudentNumber { get; set; }
    public DateTime BirthDate { get; set; }

    public class UpdateStudentHandler : IRequestHandler<UpdateStudentCommand, UpdateStudentDto>
    {
        private IStudentRepository _studentRepository;
        private IMapper _mapper;
        private StudentBusinessRules _studentBusinessRules;

        public UpdateStudentHandler(StudentBusinessRules studentBusinessRules, IMapper mapper,IStudentRepository studentRepository)
        {
            _studentBusinessRules = studentBusinessRules;
            _mapper = mapper;
            _studentRepository = studentRepository;
        }

        public async Task<UpdateStudentDto> Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
        {
            var studentToUpdate = await _studentRepository.GetAsync(x => x.Id == request.Id);
            if (studentToUpdate == null) throw new BusinessException(Messages.StudentDoesNotExist);

            studentToUpdate = _mapper.Map(request, studentToUpdate);
            Student updatedStudent = await _studentRepository.UpdateAsync(studentToUpdate);

            UpdateStudentDto studentToReturn = _mapper.Map<UpdateStudentDto>(updatedStudent);
            return studentToReturn;
        }
    }
}