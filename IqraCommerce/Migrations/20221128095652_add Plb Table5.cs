using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addPlbTable5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseExamId",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "Mark",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "CourseExams");

            migrationBuilder.AddColumn<Guid>(
                name: "BatchId",
                table: "CourseExams",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ExamDate",
                table: "CourseExams",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ExamEndTime",
                table: "CourseExams",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ExamName",
                table: "CourseExams",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExamStartTime",
                table: "CourseExams",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "ExamDate",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "ExamEndTime",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "ExamName",
                table: "CourseExams");

            migrationBuilder.DropColumn(
                name: "ExamStartTime",
                table: "CourseExams");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseExamId",
                table: "CourseExams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Mark",
                table: "CourseExams",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CourseExams",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "CourseExams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
