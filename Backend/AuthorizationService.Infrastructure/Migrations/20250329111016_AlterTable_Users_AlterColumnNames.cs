using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthorizationService.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AlterTable_Users_AlterColumnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TokenExpirationDate",
                table: "Users",
                newName: "RefreshTokenExpirationDate");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "Users",
                newName: "RefreshToken");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefreshTokenExpirationDate",
                table: "Users",
                newName: "TokenExpirationDate");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "Users",
                newName: "Token");
        }
    }
}
