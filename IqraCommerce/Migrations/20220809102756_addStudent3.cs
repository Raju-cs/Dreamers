using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addStudent3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HomeDistrict",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentNameBangla",
                table: "Student",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HomeDistrict",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "StudentNameBangla",
                table: "Student");
        }
    }
}
