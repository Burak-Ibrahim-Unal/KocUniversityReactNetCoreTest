using Application.Features.CourseMatches.Commands;
using Application.Features.Students.Commands;
using Application.Features.Students.Queries;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    public class StudentsController : BaseApiController
    {
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById([FromRoute] GetStudentByIdQuery getModelByIdQuery)
        {
            var result = await Mediator.Send(getModelByIdQuery);
            return Ok(result);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<PagedList<Student>>> GetAll([FromQuery] PageRequest pageRequest)
        {
            GetStudentListQuery getStudentListQuery = new() { pageRequest = pageRequest };
            var result = await Mediator.Send(getStudentListQuery); // assign "GetStudentListQuery getStudentListQuery" a parameter
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CreateStudentCommand createStudentCommand)
        {
            var result = await Mediator.Send(createStudentCommand);
            return Created("", result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateStudentCommand updateStudentCommand)
        {
            var result = await Mediator.Send(updateStudentCommand);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await Mediator.Send(new DeleteStudentCommand { Id = id });
            return Ok(result);
        }
    }
}
