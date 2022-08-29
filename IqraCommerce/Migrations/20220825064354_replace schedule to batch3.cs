using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class replacescheduletobatch3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScheduleName",
                table: "Batch");

            migrationBuilder.AddColumn<string>(
                name: "BtachName",
                table: "Batch",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BtachName",
                table: "Batch");

            migrationBuilder.AddColumn<string>(
                name: "ScheduleName",
                table: "Batch",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
