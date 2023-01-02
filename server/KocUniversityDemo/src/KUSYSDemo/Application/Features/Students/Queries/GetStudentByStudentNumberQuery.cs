using Application.Features.Students.Dtos;
using Application.Features.Students.Models;
using Application.Features.Students.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Caching;
using Domain.Entities;
using MediatR;

namespace Application.Features.Students.Queries;

public class GetStudentByStudentNumberQuery : IRequest<StudentDto>
{
    public string StudentNumber { get; set; }

    public class GetStudentByStudentNumberResponseHandler : IRequestHandler<GetStudentByStudentNumberQuery, StudentDto>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly StudentBusinessRules _studentBusinessRules;
        private readonly IMapper _mapper;

        public GetStudentByStudentNumberResponseHandler(IStudentRepository studentRepository, StudentBusinessRules studentBusinessRules, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _studentBusinessRules = studentBusinessRules;
            _mapper = mapper;
        }

        public async Task<StudentDto> Handle(GetStudentByStudentNumberQuery request, CancellationToken cancellationToken)
        {
            await _studentBusinessRules.CheckStudentByStudentNumber(request.StudentNumber);

            Student student = await _studentRepository.GetAsync(b => b.StudentNumber == request.StudentNumber);
            StudentDto studentDtoToReturn = _mapper.Map<StudentDto>(student);
            return studentDtoToReturn;
        }
    }
}