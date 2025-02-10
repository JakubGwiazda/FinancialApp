using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial_AppSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
            table: "AppSettings",
            columns: new[] { "Id", "Name", "ValueType", "Value", "Description" },
            values: new object[,]
            {
                { 1, "RequestFrequency", "2", "15", "How often request are sent to update data. Value in minutes." },
            });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
