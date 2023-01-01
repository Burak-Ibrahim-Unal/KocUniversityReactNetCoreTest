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

        [HttpGet]
        public async Task<ActionResult<PagedList<CourseMatch>>> GetAll([FromQuery] PageRequest pageRequest)
        {
            GetCourseMatchListQuery getCourseMatchListQuery = new() { pageRequest = pageRequest };
            var result = await Mediator.Send(getCourseMatchListQuery);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateCourseMatchCommand createCourseMatchCommand)
        {
            var result = await Mediator.Send(createCourseMatchCommand);
            return Created("", result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateCourseMatchCommand updateCourseMatchCommand)
        {
            var result = await Mediator.Send(updateCourseMatchCommand);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await Mediator.Send(new DeleteCourseMatchCommand { Id = id });
            return Ok(result);
        }
    }
}
