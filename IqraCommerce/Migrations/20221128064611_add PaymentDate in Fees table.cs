using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addPaymentDateinFeestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtendPaymentDate",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "PaidFee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "RestFee",
                table: "Fees");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "Fees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "Fees");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExtendPaymentDate",
                table: "Fees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "PaidFee",
                table: "Fees",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RestFee",
                table: "Fees",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
