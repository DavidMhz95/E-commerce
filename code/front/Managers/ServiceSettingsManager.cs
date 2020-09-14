using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Doorway.Services.Managers {
    public class ServiceSettingsManager {

        // Parameters for connect with license server
        [JsonProperty("dbHost")]
        public string DbHost { get; set; }

        // Paramaters for connect with tv department ontology
        [JsonProperty("dbName")]
        public string DbName { get; set; }

        // Parameters for connect with notv department ontology
        [JsonProperty("dbUser")]
        public string DbUser { get; set; }

        // Parameters for connect with common ontology with locations and operators
        [JsonProperty("dbPassword")]
        public string DbPass { get; set; }

        /// <summary>
        /// Load options from file lazy (not load until need it)
        /// </summary>
        private static Lazy<ServiceSettingsManager> lazyOptions = new Lazy<ServiceSettingsManager>(() => {
            ServiceSettingsManager properties = null;
            try {
                const string settingsFileName = "servicesettings.json";
                if (properties == null) {
                    properties = JsonConvert.DeserializeObject<ServiceSettingsManager>(File.ReadAllText(settingsFileName));
                }
            } catch {
                
            }
            return properties;
        }, true);

        public static ServiceSettingsManager Instance {
            get {
                return lazyOptions.Value;
            }
        }
    }
}
