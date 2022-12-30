using Application.Features.Students.Dtos;
using Application.Features.Students.Models;
using Application.Services.Repositories;
using AutoMapper;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Students.Queries
{
    public class GetStudentListQuery : IRequest<StudentListModel>
    {
        public PageRequest pageRequest { get; set; }

        public class GetStudentListQueryHandler : IRequestHandler<GetStudentListQuery, StudentListModel>
        {
            IStudentRepository _studentRepository;
            IMapper _mapper;
            public GetStudentListQueryHandler(IStudentRepository studentRepository, IMapper mapper)
            {
                _studentRepository = studentRepository;
                _mapper = mapper;
            }

            public async Task<StudentListModel> Handle(GetStudentListQuery request, CancellationToken cancellationToken)
            {
                PagedList<StudentListDto> students = await _studentRepository.GetAllStudents(
                    index: request.pageRequest.CurrentPage,
                    size: request.pageRequest.PageSize);

                StudentListModel mappedStudentsList = _mapper.Map<StudentListModel>(students);

                return mappedStudentsList;
            }
        }
    }
}