using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductsAPI.Data;
using ProductsAPI.Identity;
using ProductsAPI.Interface;
using ProductsAPI.Messaging;
using ProductsAPI.Repository;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ProductsDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IMessageSender, MessageSender>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(c =>
    {
        c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });

});

builder.Services.AddAuthentication(c =>
{
    c.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    c.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(c =>
    {
        c.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer"),
            ValidAudience = "ProductsAPI",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Secret")))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(IdentityData.G0_PolicyName, p => p.RequireClaim(IdentityData.UserTypeClaim, IdentityData.Go_PolicyValue));
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

app.UseAuthentication(); // use authentication.

app.UseAuthorization();

app.MapControllers();

app.Run();


static void InitializeDatabase(IApplicationBuilder app)
{
    using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var database = serviceScope?.ServiceProvider?.GetService<ProductsDbContext>()?.Database;
    database?.Migrate();
}

