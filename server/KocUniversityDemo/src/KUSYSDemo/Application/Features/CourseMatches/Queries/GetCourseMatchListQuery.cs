using Application.Features.CourseMatches.Dtos;
using Application.Features.CourseMatches.Models;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Pipelines.Caching;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CourseMatches.Queries
{
    public class GetCourseMatchListQuery : IRequest<CourseMatchListModel>, ICachableRequest
    {
        public PageRequest pageRequest { get; set; }

        public bool BypassCache { get; set; }
        public string CacheKey => "courseMatches-list";
        public TimeSpan? SlidingExpiration { get; set; }

        public class GetCourseMatchListQueryHandler : IRequestHandler<GetCourseMatchListQuery, CourseMatchListModel>
        {
            ICourseMatchRepository _courseMatchRepository;
            IMapper _mapper;
            public GetCourseMatchListQueryHandler(ICourseMatchRepository courseMatchRepository, IMapper mapper)
            {
                _courseMatchRepository = courseMatchRepository;
                _mapper = mapper;
            }

            public async Task<CourseMatchListModel> Handle(GetCourseMatchListQuery request, CancellationToken cancellationToken)
            {
                PagedList<CourseMatchListDto> courseMatches = await _courseMatchRepository.GetAllCourseMatches(
                    index: request.pageRequest.CurrentPage,
                    size: request.pageRequest.PageSize);

                CourseMatchListModel mappedCourseMatchsList = _mapper.Map<CourseMatchListModel>(courseMatches);

                return mappedCourseMatchsList;
            }
        }
    }
}