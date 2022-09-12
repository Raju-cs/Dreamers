using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addnewfeestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Fees");

            migrationBuilder.AddColumn<double>(
                name: "CourseFee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ModuleFee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PaidFee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RestFee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalFee",
                table: "Fees",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseFee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "Fee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "ModuleFee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "PaidFee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "RestFee",
                table: "Fees");

            migrationBuilder.DropColumn(
                name: "TotalFee",
                table: "Fees");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Fees",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
