using Api.Middleware;
using Api.Services;
using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorizedControllers();
builder.Services.AddCorsPolicy();
builder.Services.AddDataContext(builder.Configuration);
builder.Services.AddAuth(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
