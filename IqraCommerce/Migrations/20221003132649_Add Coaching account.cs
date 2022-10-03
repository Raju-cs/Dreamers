using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddCoachingaccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "CourseIncome",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "ModuleIncome",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "TotalIncome",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "FeesId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "InCome",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OutCome",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalCollected",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeesId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "InCome",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "OutCome",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "TotalCollected",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "BatchId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "CourseIncome",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ModuleId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "ModuleIncome",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "TotalIncome",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
