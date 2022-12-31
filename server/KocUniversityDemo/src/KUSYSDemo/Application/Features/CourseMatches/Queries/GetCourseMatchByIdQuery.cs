using Application.Features.CourseMatches.Dtos;
using Application.Features.CourseMatches.Models;
using Application.Features.CourseMatches.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Caching;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseMatches.Queries;

public class GetCourseMatchByIdQuery : IRequest<CourseMatchDto>
{
    public int Id { get; set; }

    public class GetCourseMatchByIdResponseHandler : IRequestHandler<GetCourseMatchByIdQuery, CourseMatchDto>
    {
        private readonly ICourseMatchRepository _courseMatchRepository;
        private readonly CourseMatchBusinessRules _courseMatchBusinessRules;
        private readonly IMapper _mapper;

        public GetCourseMatchByIdResponseHandler(ICourseMatchRepository courseMatchRepository, CourseMatchBusinessRules courseMatchBusinessRules, IMapper mapper)
        {
            _courseMatchRepository = courseMatchRepository;
            _courseMatchBusinessRules = courseMatchBusinessRules;
            _mapper = mapper;
        }

        public async Task<CourseMatchDto> Handle(GetCourseMatchByIdQuery request, CancellationToken cancellationToken)
        {
            await _courseMatchBusinessRules.CheckCourseMatchById(request.Id);

            var courseMatch = await _courseMatchRepository.GetCourseMatchById(request.Id);
            //CourseMatchDto courseMatchDtoToReturn = _mapper.Map<CourseMatchDto>(courseMatch);
            return courseMatch;
        }
    }
}