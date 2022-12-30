using Application.Features.Students.Commands;
using Application.Features.Students.Queries;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CreateStudentCommand createStudentCommand)
        {
            var result = await Mediator.Send(createStudentCommand);
            return Created("", result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateStudentCommand updateModelCommand)
        {

            var result = await Mediator.Send(updateModelCommand);
            return Ok(result);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteStudentCommand deleteModelCommand)
        {

            var result = await Mediator.Send(deleteModelCommand);
            return Ok(result);
        }



    }
}
