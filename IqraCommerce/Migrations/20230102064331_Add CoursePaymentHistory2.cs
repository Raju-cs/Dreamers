using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class AddCoursePaymentHistory2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CoursePaymentHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    ActivityId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    StudentId = table.Column<Guid>(nullable: false),
                    PeriodId = table.Column<Guid>(nullable: false),
                    Charge = table.Column<double>(nullable: false),
                    Paid = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoursePaymentHistory", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoursePaymentHistory");
        }
    }
}
