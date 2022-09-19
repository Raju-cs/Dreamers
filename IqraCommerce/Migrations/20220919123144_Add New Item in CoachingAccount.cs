using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddNewIteminCoachingAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentModuleId",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<double>(
                name: "CourseIncome",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ModuleIncome",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseIncome",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "ModuleIncome",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "StudentModuleId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
