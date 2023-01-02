using Application.Services.Repositories;
using Core.CrossCuttingConcerns.Exceptions;
using Core.Persistence.Pagination;
using Core.Utilities;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Students.Rules
{
    public class StudentBusinessRules
    {
        IStudentRepository _studentRepository;

        public StudentBusinessRules(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        //Gerkhin 
        //cross cutting concern
        public async Task CheckStudentByStudentNumber(string studentNumber)
        {
            Student result = await _studentRepository.GetAsync(student => student.StudentNumber == studentNumber);

            if (result == null) throw new BusinessException(Messages.StudentDoesNotExist);
        }     
        
        public async Task CheckStudentByStudentNumberForCreate(string studentNumber)
        {
            Student result = await _studentRepository.GetAsync(student => student.StudentNumber == studentNumber);

            if (result != null) throw new BusinessException(Messages.StudentExists);
        }


        public async Task CheckStudentById(int id)
        {
            Student result = await _studentRepository.GetAsync(student => student.Id == id);

            if (result == null) throw new BusinessException(Messages.StudentDoesNotExist);
        }


    }
}
