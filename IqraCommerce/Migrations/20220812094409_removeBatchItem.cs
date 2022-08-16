using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class removeBatchItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassRoomNumber",
                table: "Batch");

            migrationBuilder.DropColumn(
                name: "MaxStudent",
                table: "Batch");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClassRoomNumber",
                table: "Batch",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaxStudent",
                table: "Batch",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
