using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addmoduleteachernameinroutine1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "Routine");

            migrationBuilder.AddColumn<string>(
                name: "ModuleTeacherName",
                table: "Routine",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModuleTeacherName",
                table: "Routine");

            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "Routine",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
