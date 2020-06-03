using System;

namespace Doorway.Core.DAL {

    public partial class DoorwayEntities {

        public static string GetFullConnectionString(string server, string db, bool integratedSecurity, string user, string passwd) {

            var sql = new System.Data.SqlClient.SqlConnectionStringBuilder() {
                DataSource = server,
                InitialCatalog = db,
                IntegratedSecurity = integratedSecurity,
                UserID = user,
                Password = passwd
            };

            var ef = new System.Data.EntityClient.EntityConnectionStringBuilder() {
                Provider = "System.Data.SqlClient",
                ProviderConnectionString = sql.ConnectionString,
                Metadata = "res://*/DAL.DoorwayModel.csdl|res://*/DAL.DoorwayModel.ssdl|res://*/DAL.DoorwayModel.msl"
            };

            return ef.ConnectionString;
        }

               
        public DoorwayEntities(string server, string db, string user, string passwd)
            : base(GetFullConnectionString(server, db, false, user, passwd)) {
            Configuration.LazyLoadingEnabled = false;
        }

        public void Close() {
            base.Dispose();
        }

    }
}
