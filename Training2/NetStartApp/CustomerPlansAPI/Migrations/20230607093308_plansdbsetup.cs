using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CustomerPlansAPI.Migrations
{
    public partial class plansdbsetup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MonthlyCost = table.Column<double>(type: "float", nullable: false),
                    QuarterlyCost = table.Column<double>(type: "float", nullable: false),
                    HalfYearlyCost = table.Column<double>(type: "float", nullable: false),
                    YearlyCost = table.Column<double>(type: "float", nullable: false),
                    MaxDeviceSupport = table.Column<int>(type: "int", nullable: false),
                    Features = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerPlans", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerPlans");
        }
    }
}
