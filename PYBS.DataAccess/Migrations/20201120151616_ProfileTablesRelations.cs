using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PYBS.DataAccess.Migrations
{
    public partial class ProfileTablesRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRoles_AppRole_AppRoleId",
                table: "AppUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRoles_AppUser_AppUserId",
                table: "AppUserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRole",
                table: "AppRole");

            migrationBuilder.RenameTable(
                name: "AppUser",
                newName: "AppUsers");

            migrationBuilder.RenameTable(
                name: "AppRole",
                newName: "AppRoles");

            migrationBuilder.RenameIndex(
                name: "IX_AppUser_Username",
                table: "AppUsers",
                newName: "IX_AppUsers_Username");

            migrationBuilder.AddColumn<string>(
                name: "BCWC",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birtday",
                table: "AppUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "BloodTypeId",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BonusCode",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChildCount",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AppUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DistrictId",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Division",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Duty",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployerCompany",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GenderId",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Graduation",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GraduationDepartment",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdentityNumber",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsWorking",
                table: "AppUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatusId",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonnelNumber",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                table: "AppUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "SGKFirstEntry",
                table: "AppUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartingDateOfEmployment",
                table: "AppUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "AppUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "AppUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUsers",
                table: "AppUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRoles",
                table: "AppRoles",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BloodTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaritalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaritalStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Districts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ProvinceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Districts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Districts_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_BloodTypeId",
                table: "AppUsers",
                column: "BloodTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_DistrictId",
                table: "AppUsers",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_GenderId",
                table: "AppUsers",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_MaritalStatusId",
                table: "AppUsers",
                column: "MaritalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_ProvinceId",
                table: "AppUsers",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_ProvinceId",
                table: "Districts",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRoles_AppRoles_AppRoleId",
                table: "AppUserRoles",
                column: "AppRoleId",
                principalTable: "AppRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRoles_AppUsers_AppUserId",
                table: "AppUserRoles",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_BloodTypes_BloodTypeId",
                table: "AppUsers",
                column: "BloodTypeId",
                principalTable: "BloodTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_Districts_DistrictId",
                table: "AppUsers",
                column: "DistrictId",
                principalTable: "Districts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_Genders_GenderId",
                table: "AppUsers",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_MaritalStatuses_MaritalStatusId",
                table: "AppUsers",
                column: "MaritalStatusId",
                principalTable: "MaritalStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_Provinces_ProvinceId",
                table: "AppUsers",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRoles_AppRoles_AppRoleId",
                table: "AppUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRoles_AppUsers_AppUserId",
                table: "AppUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_BloodTypes_BloodTypeId",
                table: "AppUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_Districts_DistrictId",
                table: "AppUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_Genders_GenderId",
                table: "AppUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_MaritalStatuses_MaritalStatusId",
                table: "AppUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_Provinces_ProvinceId",
                table: "AppUsers");

            migrationBuilder.DropTable(
                name: "BloodTypes");

            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "MaritalStatuses");

            migrationBuilder.DropTable(
                name: "Provinces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUsers",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_BloodTypeId",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_DistrictId",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_GenderId",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_MaritalStatusId",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_ProvinceId",
                table: "AppUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRoles",
                table: "AppRoles");

            migrationBuilder.DropColumn(
                name: "BCWC",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Birtday",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "BloodTypeId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "BonusCode",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "ChildCount",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Division",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Duty",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "EmployerCompany",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Graduation",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "GraduationDepartment",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "IdentityNumber",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "IsWorking",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "MaritalStatusId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "PersonnelNumber",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "SGKFirstEntry",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "StartingDateOfEmployment",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "AppUsers");

            migrationBuilder.RenameTable(
                name: "AppUsers",
                newName: "AppUser");

            migrationBuilder.RenameTable(
                name: "AppRoles",
                newName: "AppRole");

            migrationBuilder.RenameIndex(
                name: "IX_AppUsers_Username",
                table: "AppUser",
                newName: "IX_AppUser_Username");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRole",
                table: "AppRole",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRoles_AppRole_AppRoleId",
                table: "AppUserRoles",
                column: "AppRoleId",
                principalTable: "AppRole",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRoles_AppUser_AppUserId",
                table: "AppUserRoles",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
