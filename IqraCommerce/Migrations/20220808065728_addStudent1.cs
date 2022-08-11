using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addStudent1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FathersEmail",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FathersName",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FathersOccupation",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FathersPhoneNumber",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GuardiansEmail",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GuardiansName",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GuardiansOccupation",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GuardiansPhoneNumber",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MothersEmail",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MothersName",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MothersOccupation",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MothersPhoneNumber",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PermanantAddress",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PresentAddress",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Shift",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentCollegeName",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentSchoolName",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Student",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Class",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "FathersEmail",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "FathersName",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "FathersOccupation",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "FathersPhoneNumber",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "GuardiansEmail",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "GuardiansName",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "GuardiansOccupation",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "GuardiansPhoneNumber",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "MothersEmail",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "MothersName",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "MothersOccupation",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "MothersPhoneNumber",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "PermanantAddress",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "PresentAddress",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "Section",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "Shift",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "StudentCollegeName",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "StudentSchoolName",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "Student");
        }
    }
}
