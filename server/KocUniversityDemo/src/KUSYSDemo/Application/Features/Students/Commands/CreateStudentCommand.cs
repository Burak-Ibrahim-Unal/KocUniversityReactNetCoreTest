using Application.Features.Students.Dtos;
using Application.Features.Students.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Logging;
using Core.CrossCuttingConcerns.Caching;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Students.Commands
{
    public class CreateStudentCommand : IRequest<CreateStudentDto>, ILoggableRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? StudentNumber { get; set; }


        public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand, CreateStudentDto>
        {
            private readonly IStudentRepository _studentRepository;
            private readonly IMapper _mapper;
            private readonly StudentBusinessRules _studentBusinessRules;
            private readonly ICacheService _cacheService;


            public CreateStudentCommandHandler(IStudentRepository studentRepository,
                IMapper mapper,
                StudentBusinessRules studentBusinessRules, ICacheService cacheService)
            {
                _studentRepository = studentRepository;
                _mapper = mapper;
                _studentBusinessRules = studentBusinessRules;
                _cacheService = cacheService;
            }

            public async Task<CreateStudentDto> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
            {
                await _studentBusinessRules.CheckStudentByStudentNumberForCreate(request.StudentNumber);

                var mappedStudent = _mapper.Map<Student>(request);
                var createdStudent = await _studentRepository.AddAsync(mappedStudent);
                _cacheService.Remove("students-list");

                var studentDtoToReturn = _mapper.Map<CreateStudentDto>(createdStudent);
                return studentDtoToReturn;
            }
        }
    }
}
