using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(c =>
    {
        //c.WithOrigins("*.microsoft.com").WithMethods("GET","POST").AllowAnyHeader();
        //c.WithOrigins("*.synergetics.com").WithMethods("GET").AllowAnyHeader();
        //c.WithOrigins("*.siemens.com").AllowAnyMethod().AllowAnyHeader();
        //c.WithOrigins("http://127.0.0.1:5500/").AllowAnyMethod().AllowAnyHeader();

        c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });

    options.AddPolicy("MyPolicy", c =>
    {
        c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });

});

// register db context
builder.Services.AddDbContext<CustomerPlansAPI.Context.CustomerPlansDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("PlansConnectionStrings"));
    // options.UseSqlServer(builder.Configuration.GetConnectionString("PlansSqlLiteConnectionStrings"));
    // options.UseInMemoryDatabase("CustomerPlansDb"); // in memory recommended for test and development purpose only
});


var app = builder.Build();

InitializeDatabase(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();



app.MapControllers();

app.Run();

static void InitializeDatabase(IApplicationBuilder app)
{
    using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var database = serviceScope?.ServiceProvider?.GetService<CustomerPlansAPI.Context.CustomerPlansDbContext>()?.Database;
    database?.Migrate();
}
