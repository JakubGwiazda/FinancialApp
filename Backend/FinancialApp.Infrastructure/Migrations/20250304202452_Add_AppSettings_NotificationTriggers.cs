using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Add_AppSettings_NotificationTriggers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
           table: "AppSettings",
           columns: new[] {"Name", "ValueType", "Value", "Description" },
           values: new object[,]
           {
                {"PriceChangeOver", "2", "5", "How much price have to change to trigger notification." },
                {"NumberOfResultsToCheckPriceChange", "2", "4", "How many data records have to be get to calculate price change." },
           });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
