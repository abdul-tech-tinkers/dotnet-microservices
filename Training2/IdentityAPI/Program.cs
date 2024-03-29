using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<IdentityAPI.Data.IdentityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
});

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


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
