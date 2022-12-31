using Application.Features.CourseMatches.Commands;
using Application.Features.CourseMatches.Dtos;
using Application.Features.CourseMatches.Models;
using AutoMapper;
using Core.Persistence.Pagination;
using Domain.Entities;

namespace Application.Features.CourseMatches.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CourseMatch, CreateCourseMatchCommand>().ReverseMap();
            CreateMap<CourseMatch, UpdateCourseMatchCommand>().ReverseMap();
            CreateMap<CourseMatch, DeleteCourseMatchCommand>().ReverseMap();

            CreateMap<CourseMatch, CourseMatchDto>().ReverseMap();
            CreateMap<CourseMatch, CourseMatchListDto>().ReverseMap();
            CreateMap<CourseMatch, CreateCourseMatchDto>().ReverseMap();
            CreateMap<CourseMatch, DeleteCourseMatchDto>().ReverseMap();
            CreateMap<CourseMatch, UpdateCourseMatchDto>().ReverseMap();

            CreateMap<PagedList<CourseMatch>, CourseMatchListModel>().ReverseMap();
            CreateMap<PagedList<CourseMatchListDto>, CourseMatchListModel>().ReverseMap();
            CreateMap<PagedList<CourseMatchDto>, CourseMatchListModel>().ReverseMap();
        }
    }
}
