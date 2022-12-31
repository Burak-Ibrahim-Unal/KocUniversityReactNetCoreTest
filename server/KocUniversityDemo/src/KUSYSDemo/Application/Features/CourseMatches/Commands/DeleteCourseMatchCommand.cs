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

public class DeleteCourseMatchCommand : IRequest<DeleteCourseMatchDto>, ILoggableRequest
{
    public int Id { get; set; }

    public class DeleteCourseMatchCommandHandler : IRequestHandler<DeleteCourseMatchCommand, DeleteCourseMatchDto>
    {
        private readonly ICourseMatchRepository _courseMatchRepository;
        private readonly IMapper _mapper;
        private readonly ICacheService _cacheService;

        public DeleteCourseMatchCommandHandler(ICourseMatchRepository courseMatchRepository, IMapper mapper, ICacheService cacheService)
        {
            _courseMatchRepository = courseMatchRepository;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        public async Task<DeleteCourseMatchDto> Handle(DeleteCourseMatchCommand request, CancellationToken cancellationToken)
        {
            CourseMatch courseMatchToDelete = await _courseMatchRepository.GetAsync(x => x.Id == request.Id);
            if (courseMatchToDelete == null) throw new BusinessException(Messages.CourseMatchDoesNotExist);

            CourseMatch deletedCourseMatch = await _courseMatchRepository.DeleteAsync(courseMatchToDelete);
            _cacheService.Remove("courseMatches-list");

            DeleteCourseMatchDto deletedCourseMatchDto = _mapper.Map<DeleteCourseMatchDto>(deletedCourseMatch);
            return deletedCourseMatchDto;
        }
    }
}

