using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddSearchNameinSubjectTable1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SearchName",
                table: "Module");

            migrationBuilder.AddColumn<string>(
                name: "SearchName",
                table: "Subject",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SearchName",
                table: "Subject");

            migrationBuilder.AddColumn<string>(
                name: "SearchName",
                table: "Module",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
