using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addingphonenumberandGujrdainsNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GuardiansPhoneNumber",
                table: "StudentResult",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "StudentResult",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GuardiansPhoneNumber",
                table: "StudentResult");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "StudentResult");
        }
    }
}
