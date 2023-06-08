using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<MoviesAPI.Data.MoviesDbContext>(options =>
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

builder.Services.AddControllers(); //.AddXmlDataContractSerializerFormatters();


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
            ValidAudience = "MoviesAPI",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Secret")))
        };
    });





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

//app.UseCors(); // Default policy
app.UseCors("MyPolicy"); // named policy - can be configured at controller level as well


app.UseAuthentication(); // use authentication.

app.UseAuthorization();

app.MapControllers();

app.Run();
