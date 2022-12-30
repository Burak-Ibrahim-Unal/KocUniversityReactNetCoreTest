using Application.Features.Students.Commands;
using Application.Features.Students.Dtos;
using Application.Features.Students.Models;
using AutoMapper;
using Core.Persistence.Pagination;
using Domain.Entities;

namespace Application.Features.Students.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Student, CreateStudentCommand>().ReverseMap();
            CreateMap<Student, UpdateStudentCommand>().ReverseMap();
            CreateMap<Student, DeleteStudentCommand>().ReverseMap();

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Student, StudentListDto>().ReverseMap();
            CreateMap<Student, CreateStudentDto>().ReverseMap();
            CreateMap<Student, DeleteStudentDto>().ReverseMap();
            CreateMap<Student, UpdateStudentDto>().ReverseMap();

            CreateMap<PagedList<Student>, StudentListModel>().ReverseMap();
            CreateMap<PagedList<StudentListDto>, StudentListModel>().ReverseMap();
            CreateMap<PagedList<StudentDto>, StudentListModel>().ReverseMap();


        }

    }
}
