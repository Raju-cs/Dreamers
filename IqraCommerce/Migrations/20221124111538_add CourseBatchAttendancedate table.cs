using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addCourseBatchAttendancedatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PeriodAttendanceId",
                table: "CourseBatchAttendance");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseAttendanceDateId",
                table: "CourseBatchAttendance",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseAttendanceDateId",
                table: "CourseBatchAttendance");

            migrationBuilder.AddColumn<Guid>(
                name: "PeriodAttendanceId",
                table: "CourseBatchAttendance",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
