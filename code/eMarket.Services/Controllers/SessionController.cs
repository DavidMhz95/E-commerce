using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Doorway.Core.BLL;
using Doorway.Core.DAL;
using Doorway.Services.Managers;
using Microsoft.AspNetCore.Mvc;

namespace Doorway.Services.Controllers {
    public class SessionController : Controller {

        const string USER = "USER";

        [HttpGet]
        [Route(Managers.EndpointManager.URI_WINDOWS_AUTENTICATION)]
        public ObjectResult WindowsAuthentication() {
            // Returned variable
            ObjectResult objectResult = null;
            try {

                // Try to get the user
                if (HttpContext.User.Identity.Name != null) {
                    // Login passed
                    // Set the connection to the database
                    DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);
                    User user = db.Users.ByLogin(HttpContext.User.Identity.Name).FirstOrDefault();
                    if (user == null) {
                        //Create (es un usuario del dominio sin usuario en DWAY, lo creamos)
                        user = db.Users.AddNew(HttpContext.User.Identity.Name, HttpContext.User.Identity.Name);
                        int changes = user != null ? db.SaveChanges() : 0;
                    }
                    objectResult = new ObjectResult(user!= null ? new {
                        id = user.Id,
                        login = user.Login,
                        name = user.Name,
                        picture = (user.Picture != null && user.Picture.Length > 0) ? System.Text.Encoding.UTF8.GetString(user.Picture) : string.Empty,
                        createdOn = user.CreatedOn,
                        updatedOn = user.UpdatedOn,
                        deletedOn = user.DeletedOn,
                        events = user.Events,
                        levelAccess = user.Role,
                    }:null);

                } else {
                    // Wrong credentials
                    objectResult = new ObjectResult(false);
                }
            } catch (Exception ex) {
                objectResult = this.StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            // Return result
            return objectResult;
        }
    }
}


