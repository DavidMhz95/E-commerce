using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doorway.Core.DAL;
using Doorway.Core.BLL;
using Doorway.Services.Managers;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Doorway.Services.Controllers {
    public class UserController : Controller {

        #region Methods


        [HttpGet]
        [Route(EndpointManager.GetUserLevelAccess)]
        public ObjectResult GetUserLevelAccess(string login) {
            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (!string.IsNullOrEmpty(login)) {
                try {
                    // Try get the given user or create if it doesn't exist
                    User user = db.Users.ByLogin(login)?.FirstOrDefault();
                    if (user != null) {
                        // Prepare results
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, user.Role);
                    } else {
                        // Return error doesn't exists
                        objectResult = base.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, string.Format(string.Format(Properties.Resources.errorUserDoesntExists)));
                    }
                } catch (Exception exception) {
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                }
            } else {
                // Bad request
                //objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, new { error = "Incorrect request parameters." });
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorBadParameters)));
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <param name="login">Login with the user starts the application</param>
        /// <returns>Get user by login or create if it doesn't exists</returns>
        [HttpGet]
        [Route(EndpointManager.GetOrCreateUserByLogin)]
        public ObjectResult GetOrCreateUserByLogin(string login) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (!string.IsNullOrEmpty(login)) {
                try {
                    // Try get the given user or create if it doesn't exist
                    User user = db?.Users?.ByLogin(login)?.FirstOrDefault();
                    if(user == null) {
                        //Create (al acambiar la forma del login aqui no va a entrar en la vida porque los usuarios ya estaran creados antes)
                        user = db.Users.AddNew(login, login);
                        int changes = user != null ? db.SaveChanges() : 0;
                    } else {
                        //user.Events = db.Events.GetAllActiveFromUser(user.Id).Where(e => e.StartAt.Year == DateTime.UtcNow.Year).ToList();
                        user.Events = db.Events.GetAllActiveFromUser(user.Id).ToList();
                    }
                    // Prepare results
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, new {
                        id = user.Id,
                        login = user.Login,
                        name = user.Name,
                        picture = (user.Picture != null && user.Picture.Length > 0) ? System.Text.Encoding.UTF8.GetString(user.Picture): string.Empty,
                        createdOn = user.CreatedOn,
                        updatedOn = user.UpdatedOn,
                        deletedOn = user.DeletedOn,
                        events = user.Events,
                        levelAccess = user.Role,
                    });
                } catch (Exception exception) {
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                }
            } else {
                // Bad request
                //objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, new { error = "Incorrect request parameters." });
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorBadParameters)));
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        [HttpPost]
        [Route(EndpointManager.UpdateUserImage)]
        public ObjectResult UpdateUserImage(string login) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);
            using (var reader = new StreamReader(Request.Body)) {
                string image = reader.ReadToEnd();
                // Check parameters and do the logic
                if (!string.IsNullOrEmpty(login)) {
                    try {
                        // Try get the given user or create if it doesn't exist
                        User user = db.Users.ByLogin(login).FirstOrDefault();
                        if (user != null) {
                            user.Picture = System.Text.Encoding.ASCII.GetBytes(image);
                            db.SaveChanges();
                            // Prepare results
                            objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, new {
                                id = user.Id,
                                login = user.Login,
                                name = user.Name,
                                picture = (user.Picture != null && user.Picture.Length > 0) ? System.Text.Encoding.UTF8.GetString(user.Picture) : string.Empty,
                                createdOn = user.CreatedOn,
                                updatedOn = user.UpdatedOn,
                                deletedOn = user.DeletedOn,
                                events = user.Events
                            });
                        } else {
                            objectResult = base.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, string.Format(string.Format(Properties.Resources.errorUserDoesntExists)));
                        }

                    } catch (Exception exception) {
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                    }
                } else {
                    // Bad request
                    //objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, new { error = "Incorrect request parameters." });
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorBadParameters)));
                }
                // Do something
            }


            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }


        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <param name="userId">Id of user who starts the application</param>
        /// <returns>User of the given userId</returns>
        [HttpGet]
        [Route(EndpointManager.GetUserById)]
        public ObjectResult GetUserById(int userId) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Cheeck parameters and do the logic
            if (userId > 0) {
                try {
                    // Try get the given user
                    var query = db.Users.ById(userId);
                    if (query == null || query.Count() < 1) {
                        // Return error doesn't exists
                        objectResult = base.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, string.Format(string.Format(Properties.Resources.errorUserDoesntExists)));
                    } else {
                        // Get first result of the wuery
                        User user = query.FirstOrDefault();
                        // Get the user events
                        user.Events = db.Events.GetAllActiveFromUser(user.Id).Where(e => e.StartAt.Year == DateTime.UtcNow.Year).ToList();
                        // Prepare results
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, new {
                            id = user.Id,
                            login = user.Login,
                            name = user.Name,
                            picture = (user.Picture != null && user.Picture.Length > 0) ? System.Text.Encoding.UTF8.GetString(user.Picture) : string.Empty,
                            createdOn = user.CreatedOn,
                            updatedOn = user.UpdatedOn,
                            deletedOn = user.DeletedOn,
                            events = user.Events
                        });
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


        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <returns>All users list</returns>
        [HttpGet]
        [Route(EndpointManager.GetAllUsers)]
        public ObjectResult GetAllUsers() {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            try {
                // Get first result of the wuery
                List<User> users = db.Users.GetAllActive().ToList();
                List<dynamic> expandoUsers = new List<dynamic>();
                foreach (User user in users) {
                    expandoUsers.Add(new {
                        id = user.Id,
                        login = user.Login,
                        name = user.Name,
                        picture = (user.Picture != null && user.Picture.Length > 0) ? System.Text.Encoding.UTF8.GetString(user.Picture) : string.Empty,
                        createdOn = user.CreatedOn,
                        updatedOn = user.UpdatedOn,
                        deletedOn = user.DeletedOn,
                        events = user.Events
                    });
                }
                // Prepare results
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, expandoUsers);
            } catch (Exception exception) {
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }
        #endregion

    }
}