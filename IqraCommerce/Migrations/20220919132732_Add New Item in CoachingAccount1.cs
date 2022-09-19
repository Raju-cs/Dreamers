using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddNewIteminCoachingAccount1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeesId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "BatchId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StudentCourseId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StudentModuleId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "StudentCourseId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "StudentModuleId",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "FeesId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "CoachingAccount",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
