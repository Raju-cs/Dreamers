using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddDischargeDateinstudentmodule1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveStatusChangedAt",
                table: "StudentModule");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "StudentModule");

            migrationBuilder.AddColumn<DateTime>(
                name: "DischargeDate",
                table: "StudentModule",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DischargeDate",
                table: "StudentModule");

            migrationBuilder.AddColumn<DateTime>(
                name: "ActiveStatusChangedAt",
                table: "StudentModule",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "StudentModule",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
