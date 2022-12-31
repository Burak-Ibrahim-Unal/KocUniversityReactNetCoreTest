using Application.Features.CourseMatches.Dtos;
using Application.Features.CourseMatches.Rules;
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

namespace Application.Features.CourseMatches.Commands
{
    public class CreateCourseMatchCommand : IRequest<CreateCourseMatchDto>, ILoggableRequest
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }

        public class CreateCourseMatchCommandHandler : IRequestHandler<CreateCourseMatchCommand, CreateCourseMatchDto>
        {
            private readonly ICourseMatchRepository _courseMatchRepository;
            private readonly IMapper _mapper;
            private readonly CourseMatchBusinessRules _courseMatchBusinessRules;
            private readonly ICacheService _cacheService;


            public CreateCourseMatchCommandHandler(ICourseMatchRepository courseMatchRepository,
                IMapper mapper,
                CourseMatchBusinessRules courseMatchBusinessRules, ICacheService cacheService)
            {
                _courseMatchRepository = courseMatchRepository;
                _mapper = mapper;
                _courseMatchBusinessRules = courseMatchBusinessRules;
                _cacheService = cacheService;
            }

            public async Task<CreateCourseMatchDto> Handle(CreateCourseMatchCommand request, CancellationToken cancellationToken)
            {
                await _courseMatchBusinessRules.CheckCourseMatchByCourseMatchId(request.CourseId, request.StudentId);

                var mappedCourseMatch = _mapper.Map<CourseMatch>(request);
                var createdCourseMatch = await _courseMatchRepository.AddAsync(mappedCourseMatch);
                _cacheService.Remove("courseMatches-list");

                var courseMatchDtoToReturn = _mapper.Map<CreateCourseMatchDto>(createdCourseMatch);
                return courseMatchDtoToReturn;
            }
        }
    }
}
