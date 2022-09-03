using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class EsitinPeriod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Outcome",
                table: "Period",
                newName: "OutCome");

            migrationBuilder.RenameColumn(
                name: "Income",
                table: "Period",
                newName: "InCome");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OutCome",
                table: "Period",
                newName: "Outcome");

            migrationBuilder.RenameColumn(
                name: "InCome",
                table: "Period",
                newName: "Income");
        }
    }
}
