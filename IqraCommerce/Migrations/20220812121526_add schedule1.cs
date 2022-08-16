using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addschedule1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BatchSchedule",
                table: "BatchSchedule");

            migrationBuilder.RenameTable(
                name: "BatchSchedule",
                newName: "Schedule");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedule",
                table: "Schedule",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedule",
                table: "Schedule");

            migrationBuilder.RenameTable(
                name: "Schedule",
                newName: "BatchSchedule");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BatchSchedule",
                table: "BatchSchedule",
                column: "Id");
        }
    }
}
