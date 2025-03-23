using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Add_InitialData : Migration
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
                    { 2, "PriceChangeOver", "2", "5", "How much price have to change to trigger notification." },
                    { 3, "NumberOfResultsToCheckPriceChange", "2", "4", "How many data records have to be get to calculate price change." },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
