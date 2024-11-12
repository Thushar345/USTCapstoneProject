using Microsoft.EntityFrameworkCore;
using ResourceAvailable.Data;
using ResourceAvailable.Repositories;

namespace ResourceAvailable
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register the DbContext with SQL Server
            builder.Services.AddDbContext<ResourceContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("csResourceDB")));

            // Register the repository for dependency injection
            builder.Services.AddScoped<IResourceRepository, ResourceRepository>();

            // Register services for controllers and Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add CORS services
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOriginPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Enable Swagger in development environment
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Enable HTTPS Redirection
            app.UseHttpsRedirection();

            // Use the CORS policy
            app.UseCors("AllowAnyOriginPolicy");

            // Use authorization (if needed)
            app.UseAuthorization();

            // Map controllers
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
