using Application.Features.Courses.Dtos;
using Application.Features.Courses.Rules;
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

namespace Application.Features.Courses.Commands
{
    public class CreateCourseCommand : IRequest<CreateCourseDto>, ILoggableRequest
    {
        public string CourseId { get; set; }
        public string CourseName { get; set; }


        public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, CreateCourseDto>
        {
            private readonly ICourseRepository _courseRepository;
            private readonly IMapper _mapper;
            private readonly CourseBusinessRules _courseBusinessRules;
            private readonly ICacheService _cacheService;


            public CreateCourseCommandHandler(ICourseRepository courseRepository,
                IMapper mapper,
                CourseBusinessRules courseBusinessRules, ICacheService cacheService)
            {
                _courseRepository = courseRepository;
                _mapper = mapper;
                _courseBusinessRules = courseBusinessRules;
                _cacheService = cacheService;
            }

            public async Task<CreateCourseDto> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
            {
                await _courseBusinessRules.CheckCourseByCourseId(request.CourseId);

                var mappedCourse = _mapper.Map<Course>(request);
                var createdCourse = await _courseRepository.AddAsync(mappedCourse);
                _cacheService.Remove("courses-list");

                var courseDtoToReturn = _mapper.Map<CreateCourseDto>(createdCourse);
                return courseDtoToReturn;
            }
        }
    }
}
