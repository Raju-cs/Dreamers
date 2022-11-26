using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addroutineIdinBatchAttendance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "BatchAttendance");

            migrationBuilder.AddColumn<Guid>(
                name: "RoutineId",
                table: "BatchAttendance",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoutineId",
                table: "BatchAttendance");

            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "BatchAttendance",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
