﻿using Application.Features.Courses.Dtos;
using Application.Features.Courses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Logging;
using Core.CrossCuttingConcerns.Caching;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Utilities;
using Domain.Entities;
using MediatR;

namespace Application.Features.Courses.Commands;

public class UpdateCourseCommand : IRequest<UpdateCourseDto>, ILoggableRequest
{
    public int Id { get; set; }
    public string CourseId { get; set; }
    public string CourseName { get; set; }

    public class UpdateCourseHandler : IRequestHandler<UpdateCourseCommand, UpdateCourseDto>
    {
        private ICourseRepository _courseRepository;
        private IMapper _mapper;
        private CourseBusinessRules _courseBusinessRules;
        private readonly ICacheService _cacheService;

        public UpdateCourseHandler(CourseBusinessRules courseBusinessRules, IMapper mapper,ICourseRepository courseRepository, ICacheService cacheService)
        {
            _courseBusinessRules = courseBusinessRules;
            _mapper = mapper;
            _courseRepository = courseRepository;
            _cacheService = cacheService;
        }

        public async Task<UpdateCourseDto> Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
        {
            var courseToUpdate = await _courseRepository.GetAsync(x => x.Id == request.Id);
            if (courseToUpdate == null) throw new BusinessException(Messages.CourseDoesNotExist);

            courseToUpdate = _mapper.Map(request, courseToUpdate);
            Course updatedCourse = await _courseRepository.UpdateAsync(courseToUpdate);
            _cacheService.Remove("courses-list");

            UpdateCourseDto courseToReturn = _mapper.Map<UpdateCourseDto>(updatedCourse);
            return courseToReturn;
        }
    }
}