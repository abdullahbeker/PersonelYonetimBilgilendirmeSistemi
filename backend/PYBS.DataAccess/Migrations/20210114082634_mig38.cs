using Microsoft.EntityFrameworkCore.Migrations;

namespace PYBS.DataAccess.Migrations
{
    public partial class mig38 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AppUsers_AppUserId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_AppUserId",
                table: "LeaveRequests");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "LeaveRequests");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPaid",
                table: "LeaveTypes",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_UserId",
                table: "LeaveRequests",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AppUsers_UserId",
                table: "LeaveRequests",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AppUsers_UserId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_UserId",
                table: "LeaveRequests");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPaid",
                table: "LeaveTypes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "LeaveRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_AppUserId",
                table: "LeaveRequests",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AppUsers_AppUserId",
                table: "LeaveRequests",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
