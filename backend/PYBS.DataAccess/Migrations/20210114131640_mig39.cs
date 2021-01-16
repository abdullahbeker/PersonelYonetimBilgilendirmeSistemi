using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PYBS.DataAccess.Migrations
{
    public partial class mig39 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TrainingPersonnels_TrainingId_PersonnelId",
                table: "TrainingPersonnels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingPersonnels",
                table: "TrainingPersonnels",
                columns: new[] { "TrainingId", "PersonnelId" });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(nullable: true),
                    SerialNumber = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    GivenDate = table.Column<DateTime>(nullable: false),
                    ReturnDate = table.Column<DateTime>(nullable: false),
                    IsAvailable = table.Column<bool>(nullable: false),
                    PersonnelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assets_AppUsers_PersonnelId",
                        column: x => x.PersonnelId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPersonnels_PersonnelId",
                table: "TrainingPersonnels",
                column: "PersonnelId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_PersonnelId",
                table: "Assets",
                column: "PersonnelId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPersonnels_AppUsers_PersonnelId",
                table: "TrainingPersonnels",
                column: "PersonnelId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels",
                column: "TrainingId",
                principalTable: "Trainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPersonnels_AppUsers_PersonnelId",
                table: "TrainingPersonnels");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingPersonnels",
                table: "TrainingPersonnels");

            migrationBuilder.DropIndex(
                name: "IX_TrainingPersonnels_PersonnelId",
                table: "TrainingPersonnels");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPersonnels_TrainingId_PersonnelId",
                table: "TrainingPersonnels",
                columns: new[] { "TrainingId", "PersonnelId" },
                unique: true);
        }
    }
}
