﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IqraCommerce.Migrations
{
    public partial class addBatchExamIdinStudentResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BatchExamId",
                table: "StudentResult",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchExamId",
                table: "StudentResult");
        }
    }
}
