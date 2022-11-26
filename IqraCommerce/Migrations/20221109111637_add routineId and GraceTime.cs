using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addroutineIdandGraceTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PeriodAttendance");

            migrationBuilder.AddColumn<DateTime>(
                name: "GraceTime",
                table: "PeriodAttendance",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "RoutineId",
                table: "PeriodAttendance",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GraceTime",
                table: "PeriodAttendance");

            migrationBuilder.DropColumn(
                name: "RoutineId",
                table: "PeriodAttendance");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PeriodAttendance",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
