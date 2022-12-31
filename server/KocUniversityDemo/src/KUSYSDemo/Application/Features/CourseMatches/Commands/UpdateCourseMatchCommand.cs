using Application.Features.CourseMatches.Dtos;
using Application.Features.CourseMatches.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Logging;
using Core.CrossCuttingConcerns.Caching;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Utilities;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseMatches.Commands;

public class UpdateCourseMatchCommand : IRequest<UpdateCourseMatchDto>, ILoggableRequest
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public int CourseId { get; set; }

    public class UpdateCourseMatchHandler : IRequestHandler<UpdateCourseMatchCommand, UpdateCourseMatchDto>
    {
        private ICourseMatchRepository _courseMatchRepository;
        private IMapper _mapper;
        private CourseMatchBusinessRules _courseMatchBusinessRules;
        private readonly ICacheService _cacheService;

        public UpdateCourseMatchHandler(CourseMatchBusinessRules courseMatchBusinessRules, IMapper mapper,ICourseMatchRepository courseMatchRepository, ICacheService cacheService)
        {
            _courseMatchBusinessRules = courseMatchBusinessRules;
            _mapper = mapper;
            _courseMatchRepository = courseMatchRepository;
            _cacheService = cacheService;
        }

        public async Task<UpdateCourseMatchDto> Handle(UpdateCourseMatchCommand request, CancellationToken cancellationToken)
        {
            var courseMatchToUpdate = await _courseMatchRepository.GetAsync(x => x.Id == request.Id);
            if (courseMatchToUpdate == null) throw new BusinessException(Messages.CourseMatchDoesNotExist);

            courseMatchToUpdate = _mapper.Map(request, courseMatchToUpdate);
            CourseMatch updatedCourseMatch = await _courseMatchRepository.UpdateAsync(courseMatchToUpdate);
            _cacheService.Remove("courseMatches-list");

            UpdateCourseMatchDto courseMatchToReturn = _mapper.Map<UpdateCourseMatchDto>(updatedCourseMatch);
            return courseMatchToReturn;
        }
    }
}