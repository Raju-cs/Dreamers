using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addremoveitemIdschedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "Schedule");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Schedule");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BatchId",
                table: "Schedule",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "Schedule",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
