using Microsoft.EntityFrameworkCore.Migrations;

namespace PYBS.DataAccess.Migrations
{
    public partial class Update_Training_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "TrainingPersonnels");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Trainings",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Trainings");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "TrainingPersonnels",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
