using Application.Features.Courses.Dtos;
using Application.Features.Courses.Models;
using Application.Features.Courses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Caching;
using Domain.Entities;
using MediatR;

namespace Application.Features.Courses.Queries;

public class GetCourseByCourseIdQuery : IRequest<CourseDto>
{
    public string CourseId { get; set; }

    public class GetByIdCourseResponseHandler : IRequestHandler<GetCourseByCourseIdQuery, CourseDto>
    {
        private readonly ICourseRepository _courseRepository;
        private readonly CourseBusinessRules _courseBusinessRules;
        private readonly IMapper _mapper;

        public GetByIdCourseResponseHandler(ICourseRepository courseRepository, CourseBusinessRules courseBusinessRules, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _courseBusinessRules = courseBusinessRules;
            _mapper = mapper;
        }

        public async Task<CourseDto> Handle(GetCourseByCourseIdQuery request, CancellationToken cancellationToken)
        {
            await _courseBusinessRules.CheckCourseByCourseId(request.CourseId);

            Course course = await _courseRepository.GetAsync(b => b.CourseId == request.CourseId);
            CourseDto courseDtoToReturn = _mapper.Map<CourseDto>(course);
            return courseDtoToReturn;
        }
    }
}