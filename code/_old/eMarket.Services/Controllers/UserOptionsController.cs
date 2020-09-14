using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Doorway.Core.BLL;
using Doorway.Core.DAL;
using Doorway.Services.Managers;

namespace Doorway.Services.Controllers {


    public class UserOptionsController : Controller {


        [HttpGet]
        [Route(EndpointManager.GetAllUserOptions)]
        public ObjectResult GetAllUserOptions(string login) {
            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (!string.IsNullOrEmpty(login)) {
                try {
                    // Get the active user
                    User user = db.Users.ByLogin(login)?.FirstOrDefault();
                    if (user != null) {
                        CheckUserOptions(user, db);
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, user?.UserOptions);
                    } else {
                        // Return error doesn't exists
                        objectResult = base.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, string.Format(string.Format(Properties.Resources.errorUserDoesntExists)));
                    }
                } catch (Exception exception) {
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                }
            } else {
                // Bad request
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorBadParameters)));
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        [HttpGet]
        [Route(EndpointManager.SetUserOption)]
        public ObjectResult SetUserOption(string login, string option, string newValue) {
            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (!string.IsNullOrEmpty(login)) {
                try {
                    // Get the active user
                    User user = db.Users.ByLogin(login)?.FirstOrDefault();
                    if (user != null && user?.UserOptions != null) {
                        user.UserOptions = db.UserOptions.ByUser(user.Id).ToList();
                        if (user.UserOptions.Select(x => x.Name).Contains(option) && user.UserOptions.Where(x => x.Name == option).ToList().Count > 0) {
                            int id = user.UserOptions.Where(x => x.Name == option).FirstOrDefault().Id;
                            db.UserOptions.Update(id, newValue);
                            db.SaveChanges();
                        }
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, true);
                    } else {
                        // Return error doesn't exists
                        objectResult = base.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, string.Format(string.Format(Properties.Resources.errorUserDoesntExists)));
                    }
                } catch (Exception exception) {
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                }
            } else {
                // Bad request
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorBadParameters)));
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }


        public const string COOKIES = "COOKIES";
        public const string NEWS = "NEWS";
        public const string ENABLE_RANKING = "ENABLE_RANKING";
        public const string ENABLE_TIMELINE = "ENABLE_TIMELINE";

        private static readonly Dictionary<string, string> Options = new Dictionary<string, string>() {
            [COOKIES] = "19.1.1",
            [NEWS] = "19.1.1",
            [ENABLE_RANKING] = "false",
            [ENABLE_TIMELINE] = "false"
        };

        private void CheckUserOptions(User user, DoorwayEntities db) {
            user.UserOptions = db.UserOptions.ByUser(user.Id).ToList();
            bool needUpdateDatabase = false;
            foreach (KeyValuePair<string, string> option in Options) {
                if (!user.UserOptions.Select(x => x.Name).ToList().Contains(option.Key)) {
                    db.UserOptions.AddNew(user.Id, option.Key, option.Value);
                    needUpdateDatabase = true;
                }
            }
            if (needUpdateDatabase) {
                db.SaveChanges();
            }
        }
    }
}
