using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// register db context
builder.Services.AddDbContext<CustomerPlansAPI.Context.CustomerPlansDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("PlansConnectionStrings"));
    // options.UseSqlServer(builder.Configuration.GetConnectionString("PlansSqlLiteConnectionStrings"));
    // options.UseInMemoryDatabase("CustomerPlansDb"); // in memory recommended for test and development purpose only
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
