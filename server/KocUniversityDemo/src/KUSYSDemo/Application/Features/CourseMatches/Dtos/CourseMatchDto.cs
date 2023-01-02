namespace Application.Features.CourseMatches.Dtos;

public class CourseMatchDto
{
    public int Id { get; set; }
    public int StudentTableId { get; set; }
    public int CourseTableId { get; set; }
    public string StudentFirstName { get; set; }
    public string StudentLastName { get; set; }
    public string? StudentNumber { get; set; }
    public string CourseId { get; set; }
    public string CourseName { get; set; }
}