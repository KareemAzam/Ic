using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // todo: should remove env.IsDevelopment 
            // todo : i leave it because it's use swagger
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            //}

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddControllers();

            services.AddDbContext<Db>(
                x => x.UseSqlServer(_config.GetConnectionString("DefaultConnection")));

            services.AddSingleton<IConnectionMultiplexer>(_ =>
            {
                var configuration = ConfigurationOptions.Parse(_config.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddApplicationServices();

            services.AddIdentityService(_config);

            services.AddSwaggerDocumentation();

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    policy =>
                    {
                        policy.AllowAnyHeader().AllowAnyMethod()
                            .WithOrigins("https://localhost:4200", "https://localhost:4201");
                    });
            });
        }
    }
}