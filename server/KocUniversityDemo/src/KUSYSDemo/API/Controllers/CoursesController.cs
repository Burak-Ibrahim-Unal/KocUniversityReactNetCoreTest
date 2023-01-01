using Application.Features.CourseMatches.Commands;
using Application.Features.Courses.Commands;
using Application.Features.Courses.Queries;
using Application.Features.Students.Commands;
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

        [HttpGet]
        public async Task<ActionResult<PagedList<Course>>> GetAll([FromQuery] PageRequest pageRequest)
        {
            GetCourseListQuery getCourseListQuery = new() { pageRequest = pageRequest };
            var result = await Mediator.Send(getCourseListQuery);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateCourseCommand createCourseCommand)
        {
            var result = await Mediator.Send(createCourseCommand);
            return Created("", result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateCourseCommand updateCourseCommand)
        {
            var result = await Mediator.Send(updateCourseCommand);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await Mediator.Send(new DeleteCourseCommand { Id = id });
            return Ok(result);
        }
    }
}
