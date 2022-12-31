using Application.Features.CourseMatches.Commands;
using Application.Features.CourseMatches.Queries;
using Core.Application.Requests;
using Core.Persistence.Pagination;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    public class CourseMatchesController : BaseApiController
    {
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById([FromRoute] GetCourseMatchByIdQuery getCourseMatchByIdQuery)
        {
            var result = await Mediator.Send(getCourseMatchByIdQuery);
            return Ok(result);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<PagedList<CourseMatch>>> GetAll([FromQuery] PageRequest pageRequest)
        {
            GetCourseMatchListQuery getCourseMatchListQuery = new() { pageRequest = pageRequest };
            var result = await Mediator.Send(getCourseMatchListQuery);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CreateCourseMatchCommand createCourseMatchCommand)
        {
            var result = await Mediator.Send(createCourseMatchCommand);
            return Created("", result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateCourseMatchCommand updateCourseMatchCommand)
        {
            var result = await Mediator.Send(updateCourseMatchCommand);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteCourseMatchCommand deleteCourseMatchCommand)
        {
            var result = await Mediator.Send(deleteCourseMatchCommand);
            return Ok(result);
        }
    }
}
