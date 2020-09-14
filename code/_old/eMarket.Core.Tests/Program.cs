using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eMarket.Core.Tests
{
    class Program
    {
        public static void Main()
        {
            ElasticClient client;
            using (ConnectionSettings settings = new ConnectionSettings(new Uri("http://localhost:9200")))
            {
                List<ObjetoEjemplo> listax = new List<ObjetoEjemplo>()
                {
                    new ObjetoEjemplo()
                    {
                        titulo = "Hola",
                        descripcion = "buenas"
                    },
                    new ObjetoEjemplo()
                    {
                        titulo = "Holae",
                        descripcion = "bueneeas"
                    },
                    new ObjetoEjemplo()
                    {
                        titulo = "Ho33rla",
                        descripcion = "buentrfgas"
                    },
                    new ObjetoEjemplo()
                    {
                        titulo = "Holwwa",
                        descripcion = "buewernas"
                    }

                };

                settings.RequestTimeout(TimeSpan.FromSeconds(30));
                //settings.BasicAuthentication(String.Empty, String.Empty);
                settings.DefaultIndex("prueba");
                client = new ElasticClient(settings);
                ObjetoEjemplo a = new ObjetoEjemplo();
                
                //var response = client.Indices.Create("prueba",
                //    index => index.Map<ObjetoEjemplo>(
                //    x => x.AutoMap()
                //    ));
                var ab = client.IndexMany(listax);

            }
        }
    }


    public class ObjetoEjemplo
    {
        public string titulo = "La vida es dura";
        public string descripcion = "Y la mahou es clasica";

        public ObjetoEjemplo(){
        
        }
    }
}
