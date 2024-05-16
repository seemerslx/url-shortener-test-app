using Microsoft.EntityFrameworkCore;
using UrlShortenerApi.Confiuguration;
using UrlShortenerApi.Core.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterCoreDependencies(builder.Configuration);

builder.Services.RegisterCoreConfiguration(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallback(async (HttpContext context, ApplicationDbContext dbContext) =>
{
    var path = context.Request.Path.ToUriComponent().Trim('/');

    var urlMatch = await dbContext.Urls
    .FirstOrDefaultAsync(x => x.ShortUrl.Trim() == path.Trim());

    if (urlMatch is null)
    {
        return Results.BadRequest("Invalid short url");
    }

    return Results.Redirect(url: urlMatch.Url);
});

app.Run();