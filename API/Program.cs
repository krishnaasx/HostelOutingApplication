using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddRazorPages();

builder.Services.AddDbContext<DataContext> ( options => options.UseSqlServer("Server=KRISH;Database=HostelOutingApplicationDB;Trusted_Connection=True;TrustServerCertificate=True"));

var app = builder.Build();
// Configure the HTTP request pipeline.

app.MapRazorPages();
app.MapControllers();

app.Run();
