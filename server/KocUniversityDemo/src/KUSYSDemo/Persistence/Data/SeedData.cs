using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Data
{
    public static class SeedData
    {
        public static async Task Initialize(BaseDbContext baseDbContext, UserManager<User> userManager)
        {
            if (baseDbContext.Students.Any()) return;
            if (baseDbContext.Courses.Any()) return;

            if (!userManager.Users.Any())
            {
                var adminUser = new User
                {
                    UserName = "Burak",
                    Email = "burakibrahim@gmail.com",
                };
                await userManager.CreateAsync(adminUser, "Burak1234!");
                await userManager.AddToRolesAsync(adminUser, new[] { "User", "Admin" });

                var memberUser = new User
                {
                    UserName = "testuser",
                    Email = "burakibrahim2@gmail.com"
                };
                await userManager.CreateAsync(memberUser, "Burak1234!");
                await userManager.AddToRoleAsync(memberUser, "User");
            }

            var students = new List<Student>();
            for (int i = 0; i < 25; i++)
            {
                students.Add(new Student
                {
                    FirstName = "Burak" + (i + 1),
                    LastName = "Unal" + (i + 1),
                    StudentNumber = "20231234" + (i + 1 < 10 ? "0" + (i + 1).ToString() : (i + 1).ToString()),
                    BirthDate = new DateTime(1987, 1, 1)
                });
            }
            foreach (var student in students)
            {
                baseDbContext.Students.Add(student);
            }

            var courses = new List<Course>
            {
                new Course()
                {
                    CourseId="CSI101",
                    CourseName="Introduction to Computer Science"
                },
                new Course()
                {
                    CourseId="CSI102",
                    CourseName="Algorithms"
                },
                new Course()
                {
                    CourseId="MAT101",
                    CourseName="Calculus"
                },
                new Course()
                {
                    CourseId="PHY101",
                    CourseName="Physics"
                },
            };
            foreach (var course in courses)
            {
                baseDbContext.Courses.Add(course);
            }

            baseDbContext.SaveChanges();
        }
    }
}
