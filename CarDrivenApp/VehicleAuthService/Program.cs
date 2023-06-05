using VehicleAuthService.Interface;
using VehicleAuthService.Service;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddSingleton<ITokenService, TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/validate", [AllowAnonymous] (UserValidationRequestModel request,
    HttpContext http, ITokenService tokenService) =>
{
    if (request is UserValidationRequestModel { UserName: "john.doe", Password: "123456" })
    {
        var token = tokenService.BuildToken(builder.Configuration["Jwt:Key"],
                                            builder.Configuration["Jwt:Issuer"],
                                            new[]
                                            {
                                             builder.Configuration["Jwt:Aud1"],
                                             builder.Configuration["Jwt:Aud2"]
                                            }, request.UserName);
        return new
        {
            Token = token,
            IsAuthenticated = true,
        };
    }
    return new
    {
        Token = string.Empty,
        IsAuthenticated = false
    };
}).WithName("Validate");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

//Where UserValidationRequestModel is defined as
internal record UserValidationRequestModel([Required] string UserName, [Required] string Password);

