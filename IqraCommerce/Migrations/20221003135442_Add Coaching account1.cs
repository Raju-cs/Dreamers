using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddCoachingaccount1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "PeriodId",
                table: "CoachingAccount",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PeriodId",
                table: "CoachingAccount");

            migrationBuilder.AddColumn<Guid>(
                name: "FeesId",
                table: "CoachingAccount",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "InCome",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OutCome",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalCollected",
                table: "CoachingAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
