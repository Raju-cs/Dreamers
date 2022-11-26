using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addEarlyLeaveTimeinBatchAttendance1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendanceDate",
                table: "BatchAttendance");

            migrationBuilder.AddColumn<DateTime>(
                name: "AttendanceTime",
                table: "BatchAttendance",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EarlyLeaveTime",
                table: "BatchAttendance",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendanceTime",
                table: "BatchAttendance");

            migrationBuilder.DropColumn(
                name: "EarlyLeaveTime",
                table: "BatchAttendance");

            migrationBuilder.AddColumn<DateTime>(
                name: "AttendanceDate",
                table: "BatchAttendance",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
