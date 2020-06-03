using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

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
    /// Startup program
    /// </summary>
    public class Program {

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) {
            return WebHost.CreateDefaultBuilder(args).UseStartup<Startup>();
        }

        [System.Obsolete]
        public static void Main(string[] args) {

            const string LocalhostFormat = "http://localhost:{0}/;https://localhost:{1}/";
            int port = 5000;
            if (args?.Length > 0) {
                int.TryParse(args[0], out port);
            }
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .UseUrls(string.Format(LocalhostFormat, port, port+1))
                .Build();

            host.Run();
        }

    }
}
