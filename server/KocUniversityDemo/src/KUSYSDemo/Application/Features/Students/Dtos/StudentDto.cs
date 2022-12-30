namespace Application.Features.Students.Dtos;

public class StudentDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? StudentNumber { get; set; }
    public DateTime BirthDate { get; set; }
}