using Application.Features.Courses.Commands;
using Application.Features.Courses.Queries;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    public class CoursesController : BaseApiController
    {
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById([FromRoute] GetCourseByIdQuery getModelByIdQuery)
        {
            var result = await Mediator.Send(getModelByIdQuery);
            return Ok(result);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<PagedList<Course>>> GetAll([FromQuery] PageRequest pageRequest)
        {
            GetCourseListQuery getCourseListQuery = new() { pageRequest = pageRequest };
            var result = await Mediator.Send(getCourseListQuery);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CreateCourseCommand createCourseCommand)
        {
            var result = await Mediator.Send(createCourseCommand);
            return Created("", result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateCourseCommand updateCourseCommand)
        {
            var result = await Mediator.Send(updateCourseCommand);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteCourseCommand deleteCourseCommand)
        {
            var result = await Mediator.Send(deleteCourseCommand);
            return Ok(result);
        }
    }
}
