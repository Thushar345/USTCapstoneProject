using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AllocateResourceAPI.Migrations
{
    /// <inheritdoc />
    public partial class arnew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResourceId",
                table: "ResourceAllocatedTbl",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "ResourceAllocatedTbl");
        }
    }
}
