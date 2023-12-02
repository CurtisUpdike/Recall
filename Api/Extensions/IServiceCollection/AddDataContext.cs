using Api.Data;
using Microsoft.EntityFrameworkCore;


namespace Api.Extensions;

public static partial class IServiceCollectionExtensions
{
    public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("DataContext"));
        });

        return services;
    }
}