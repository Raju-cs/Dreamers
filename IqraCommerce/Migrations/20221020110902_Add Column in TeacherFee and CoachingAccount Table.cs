using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddColumninTeacherFeeandCoachingAccountTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ModuleId",
                table: "TeacherFee",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId",
                table: "TeacherFee",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Percentage",
                table: "TeacherFee",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "TeacherFee",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "TeacherFee",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ModuleId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Percentage",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "TeacherFee");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "TeacherFee");

            migrationBuilder.DropColumn(
                name: "Percentage",
                table: "TeacherFee");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "TeacherFee");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "TeacherFee");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "Percentage",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "CoachingAccount");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "CoachingAccount");
        }
    }
}
