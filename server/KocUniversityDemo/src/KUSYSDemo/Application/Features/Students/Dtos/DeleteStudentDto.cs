﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Students.Dtos
{
    public class DeleteStudentDto
    {
        public int Id { get; set; }
        public string? StudentNumber { get; set; }
    }
}
