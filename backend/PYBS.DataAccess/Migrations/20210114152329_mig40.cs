using Microsoft.EntityFrameworkCore.Migrations;

namespace PYBS.DataAccess.Migrations
{
    public partial class mig40 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels",
                column: "TrainingId",
                principalTable: "Trainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPersonnels_Trainings_TrainingId",
                table: "TrainingPersonnels",
                column: "TrainingId",
                principalTable: "Trainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
