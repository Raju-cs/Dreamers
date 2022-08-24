using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class editBatchRoutine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Days",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "ShiftName",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "TotalRoomNumber",
                table: "BatchRoutine");

            migrationBuilder.AddColumn<Guid>(
                name: "ScheduleId",
                table: "BatchRoutine",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "BatchRoutine");

            migrationBuilder.AddColumn<string>(
                name: "Days",
                table: "BatchRoutine",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftName",
                table: "BatchRoutine",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "BatchRoutine",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TotalRoomNumber",
                table: "BatchRoutine",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
