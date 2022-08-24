using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addBatchRoutine1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "SubjectCode",
                table: "BatchRoutine");

            migrationBuilder.AddColumn<string>(
                name: "Days",
                table: "BatchRoutine",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Time",
                table: "BatchRoutine",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TotalRoomNumber",
                table: "BatchRoutine",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Days",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "BatchRoutine");

            migrationBuilder.DropColumn(
                name: "TotalRoomNumber",
                table: "BatchRoutine");

            migrationBuilder.AddColumn<Guid>(
                name: "BatchId",
                table: "BatchRoutine",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ScheduleId",
                table: "BatchRoutine",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "SubjectCode",
                table: "BatchRoutine",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
