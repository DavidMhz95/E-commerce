using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) The Reuse Company. All rights reserved.
 *
 *  Unauthorized copying of this file, via any medium is strictly prohibited.
 *  Proprietary and confidential
 *  Written by Francisco J. Rodriguez <francisco.rodriguez@reusecompany.com> 
 *  & Miguel A. Rozalen <miguel.rozalen@reusecompany.com>
 *  & Alvaro Aranda <alvaro.aranda@reusecompany.com>
 *  March 2019
 *--------------------------------------------------------------------------------------------*/
namespace SMR.Services {

    /// <summary>
    /// Startup class for configure IIS
    /// </summary>
    public class Startup {

        #region Variables

        // Language support 
        internal const string SpanishTwoLetterISOLanguageName = "es";
        internal const string EnglishTwoLetterISOLanguageName = "en";

        #endregion

        // This method gets called by the runtime. Use this method to add senamesparvices to the container.
        const string DoorwayCorsPolicy = "DoorwayServicesPolicy";
        const string API = "/api/";
        const string INDEX = "/index.html";
        const string ResourcesPath = "Resources";

        public void ConfigureServices(IServiceCollection services) {
            // Configure Compression level
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);

            // Add Response compression services
            services.AddResponseCompression(options => {
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
                options.EnableForHttps = true;
            });

            // Add location services
            services.AddLocalization(opts => opts.ResourcesPath = ResourcesPath);
            services.AddCors(o => o.AddPolicy(DoorwayCorsPolicy, builder => {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            }))
            .AddMvc()
            .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
            .AddDataAnnotationsLocalization();
                       
            // Configure available cultures
            services.Configure<RequestLocalizationOptions>(opts => {
                var supportedCultures = new List<CultureInfo>() {
                    new CultureInfo(SpanishTwoLetterISOLanguageName),
                    new CultureInfo(EnglishTwoLetterISOLanguageName)
                };
                opts.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture(SpanishTwoLetterISOLanguageName);
                opts.SupportedCultures = supportedCultures;
                opts.SupportedUICultures = supportedCultures;
            });
            // Force language 
            Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(SpanishTwoLetterISOLanguageName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
            //Configure compression
            app.UseResponseCompression();

            // Redirect any non-API calls to the Angular application
            // so our application can handle the routing
            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith(API)) {
                    context.Request.Path = INDEX;
                    await next();
                }
            });

            // CORS middleweare
            app.UseCors(DoorwayCorsPolicy);

            // Configures application for usage as API
            // with default route of '/api/[Controller]'
            app.UseMvcWithDefaultRoute();

            // Configures applcation to serve the index.html file from /wwwroot
            // when you access the server from a web browser
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Location middleware
            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);
        }

    }
}
