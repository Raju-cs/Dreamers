using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addEndTimeschedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Schedule");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Schedule",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Schedule",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Schedule");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Schedule");

            migrationBuilder.AddColumn<DateTime>(
                name: "Time",
                table: "Schedule",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
