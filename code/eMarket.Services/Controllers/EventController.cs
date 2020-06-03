using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doorway.Core.BLL;
using Doorway.Core.DAL;
using Doorway.Services.Managers;
using Microsoft.AspNetCore.Mvc;

namespace Doorway.Services.Controllers {
    public class EventController : Controller {

        #region Constants
        const string stringEmpty = "";
        const string stringNull = "null";
        #endregion

        #region Private Methods
        private ObjectResult CreateEvent(int categoryId, string start, string end, string comments, DoorwayEntities db, User user) {
            ObjectResult objectResult;
            // Get the category of the event
            var query = db.Categories.ById(categoryId);
            if (query == null || query.Count() < 1) {
                // The given category name doesn't exists in the database
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorCategoryDoesntExists)));
            } else {
                if (query.Count() > 1) {
                    // There are several categories with the same name in the database
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorSeveralCategoriesWithSameName)));
                } else {
                    Category category = query.FirstOrDefault();
                    // Try to add a new event with the user and category

                    if (DateTime.TryParse(start, out DateTime startTime)) {
                        Event newEvent;
                        if (string.Compare(stringNull, end) == 0 || string.IsNullOrEmpty(end)) {
                            newEvent = db.Events.AddNew(user.Id, category, startTime, null, comments, DateTime.UtcNow);
                        } else {
                            newEvent = db.Events.AddNew(user.Id, category, startTime, DateTime.Parse(end), comments, DateTime.UtcNow);
                        }
                        if (newEvent != null) {
                            // Save chenges in the database
                            db.SaveChanges();
                            // Prepare results
                            objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, newEvent);
                        } else {
                            // Error in event creation
                            objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorDuringEventCreation)));
                        }
                    } else {
                        // Error in event creation
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorDuringEventCreation)));
                    }
                }
            }

            return objectResult;
        }
        #endregion

        #region Services Methods
        /// <summary>
        /// Add a new event to a given user id
        /// </summary>
        /// <param name="userId">Id of user who starts the application</param>
        /// <param name="categoryID">Id of the category for add the event</param>
        /// <param name="startTime">Start date of the event</param>
        /// <param name="endTime">End date of the event</param>
        /// <param name="comments">Optional comments</param>
        /// <returns>Create event</returns>
        /// Call example: http://localhost:54413/addEvent?userId=3&categoryId=1&startTime=2019-05-16T08:30:30&endTime=2019-05-16T17:30:30
        [HttpGet]
        [Route(EndpointManager.AddEvent)]
        public ObjectResult AddEvent(int userId, int categoryId, string start, string end, string comments = stringEmpty) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (DateTime.TryParse(start, out DateTime startTime) &&
                userId > 0 && categoryId > 0 && startTime.Year > 1) {
                try {
                    // Get the active user
                    User user = db.Users.ById(userId)?.FirstOrDefault();
                    if (user != null) {
                        objectResult = CreateEvent(categoryId, start, end, comments, db, user);
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

        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <param name="userId">Id of user who starts the event</param>
        /// <param name="categoryID">Id of the category for add the event</param>
        /// <param name="comments">Optional comments</param>
        /// <returns>Set event</returns>
        [HttpGet]
        [Route(EndpointManager.SetEvent)]
        public ObjectResult SetEvent(int userId, string date, int categoryId = 0, string comments = stringEmpty) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Cheeck parameters and do the logic
            if (userId > 0) {
                try {
                    // Try get the given user
                    var query = db.Users.ById(userId);
                    if (query != null || query.Count() >= 1) {
                        // Get first result of the query
                        User user = query.FirstOrDefault();
                        // Get last event opent of the user and finish it
                        List<Event> openUserEvents = db.Events.GetAllOpenFromUser(user.Id).ToList();
                        if (openUserEvents != null && openUserEvents.Count() > 0) {
                            foreach (Event userEvent in openUserEvents) {
                                //userEvent.EndAt = DateTime.UtcNow;
                                if (DateTime.TryParse(date, out DateTime d)) {
                                    db.Events.FinishEvent(userEvent.Id, d);
                                } else {
                                    db.Events.FinishEvent(userEvent.Id, DateTime.UtcNow);
                                }
                            }
                            db.SaveChanges();
                        }
                        if (categoryId > 0) {
                            string startDate = (string.IsNullOrEmpty(date)) ? DateTime.UtcNow.ToString() : date;
                            objectResult = CreateEvent(categoryId, startDate, null, comments, db, user);
                        } else {
                            // Prepare results
                            objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, null);
                        }

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

        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <returns>Timeline of all company</returns>
        [HttpGet]
        [Route(EndpointManager.GetCompanyTimeline)]
        public ObjectResult GetCompanyTimeline(string login) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            try {
                // Get first result of the query
                List<Tuple<Event, string>> eventos = new List<Tuple<Event, string>>();
                //Miramos si el usuario que pregunta tiene habilitado el timeline o es administrador
                //Comprobamos si el usuario de la peticion es admin
                User u = db.Users.ByLogin(login)?.FirstOrDefault();
                bool isAdmin = !string.IsNullOrEmpty(login) && u != null && u.Role == 1;

                if (isAdmin || db.UserOptions?.ByUser(u.Id)?.Where(x => x.Name == UserOptionsController.ENABLE_TIMELINE && x.Value == bool.TrueString)?.ToList()?.Count > 0) {
                    List<Event> timelineEvents = db.Events.GetAllActive().Where(ev => ev.StartAt.Year == DateTime.UtcNow.Year && ev.StartAt.Month == DateTime.UtcNow.Month && ev.StartAt.Day == DateTime.UtcNow.Day && ev.StartAt <= DateTime.UtcNow)?.ToList();
                    if (timelineEvents.Count > 0) {
                      

                        foreach (Event ev in timelineEvents) {
                            bool.TryParse(db.UserOptions?.ByUser(ev.UserId.Value)?.Where(x => x.Name == UserOptionsController.ENABLE_TIMELINE).FirstOrDefault()?.Value, out bool isPublic);
                            if (ev.UserId.HasValue && (isPublic || isAdmin)) {
                                eventos.Add(new Tuple<Event, string>(ev, db?.Users?.ById(ev.UserId.Value)?.FirstOrDefault()?.Name));
                            }
                        }
                    }
                }
                // Prepare results
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, eventos);

            } catch (Exception exception) {
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        [HttpGet]
        [Route(EndpointManager.GetEmployeeOfTheMonth)]
        public ObjectResult GetEmployeeOfTheMonth(string login) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            try {
                List<KeyValuePair<string, double>> values = new List<KeyValuePair<string, double>>();
                //Miramos si el usuario que pregunta tiene habilitado el ranking o es admin
                User u = db.Users.ByLogin(login)?.FirstOrDefault();
                bool isAdmin = !string.IsNullOrEmpty(login) && u != null && u.Role == 1;
                if (isAdmin || db.UserOptions?.ByUser(u.Id)?.Where(x => x.Name == UserOptionsController.ENABLE_RANKING && x.Value == bool.TrueString)?.ToList()?.Count > 0) {
                    // Get first result of the query
                    List<Tuple<Event, string>> eventos = new List<Tuple<Event, string>>();
                    List<Event> thisMonthEvents = db.Events.GetAllActive().Where(ev => ev.StartAt.Year == DateTime.UtcNow.Year &&
                        ev.StartAt.Month == DateTime.UtcNow.Month &&
                        ev.Category.Id < 4
                        //TODO REVIEW THIS ev.Category.ContributeToWorktime == 1)
                        )?.ToList();


                    if (thisMonthEvents.Count > 0) {
                        Dictionary<string, double> times = new Dictionary<string, double>();
                        var usersId = thisMonthEvents.Select(x => x.UserId).Distinct();
                        var eventsByUserId = thisMonthEvents.ToLookup(p => p.UserId);

                        foreach (var user in usersId) {
                            if (user != null) {
                                bool.TryParse(db.UserOptions?.ByUser(user.Value)?.Where(x => x.Name == UserOptionsController.ENABLE_RANKING).FirstOrDefault()?.Value, out bool isPublic);
                                if (isPublic || isAdmin) {
                                    string userName = db?.Users?.ById(user.Value)?.FirstOrDefault()?.Name;
                                    double totalTime = 0;
                                    foreach (var e in eventsByUserId[user]) {
                                        DateTime endTime = DateTime.UtcNow;
                                        if (e.EndAt.HasValue) {
                                            endTime = e.EndAt.Value;
                                        }
                                        totalTime += endTime.Subtract(e.StartAt).TotalHours;
                                    }
                                    if (times.ContainsKey(userName)) {
                                        times[userName] += totalTime;
                                    } else {
                                        times.Add(userName, totalTime);
                                    }
                                }
                            }
                        }

                        values = times.OrderByDescending(x => x.Value).ToList();
                    }
                }
                // Prepare results
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, values);

            } catch (Exception exception) {
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        [HttpGet]
        [Route(EndpointManager.GetActualStatus)]
        public ObjectResult GetActualStatus() {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            try {
                // Get first result of the query
                List<Tuple<Event, string>> eventos = new List<Tuple<Event, string>>();
                List<Event> nowEvents = db.Events.GetAllActive().Where(ev => ev.StartAt.Year == DateTime.UtcNow.Year &&
                    ev.StartAt.Month == DateTime.UtcNow.Month &&
                    ev.StartAt.Day == DateTime.UtcNow.Day)?.ToList();

                List<Event> filteredEvents = new List<Event>();
                foreach (Event e in nowEvents) {
                    if (e.StartAt.Ticks <= DateTime.UtcNow.Ticks && (e.EndAt == null || DateTime.UtcNow.Ticks <= e.EndAt.Value.Ticks)) {
                        filteredEvents.Add(e);
                    }
                }
                nowEvents.Clear();
                nowEvents = null;

                List<KeyValuePair<string, int>> values = new List<KeyValuePair<string, int>>();

                if (filteredEvents.Count > 0) {
                    var usersId = filteredEvents.Select(x => x.UserId).Distinct();
                    var eventsByUserId = filteredEvents.ToLookup(p => p.UserId);
                    foreach (var user in usersId) {
                        if (user != null) {
                            string userName = db?.Users?.ById(user.Value)?.FirstOrDefault()?.Name;
                            int? userId = eventsByUserId[user]?.FirstOrDefault()?.CategoryId;
                            if (!string.IsNullOrEmpty(userName) && userId.HasValue) {
                                values.Add(new KeyValuePair<string, int>(userName, userId.Value));
                            }
                        }
                    }
                }
                // Prepare results
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, values);

            } catch (Exception exception) {
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }

        /// <summary>
        /// Add a new event to a given user id
        /// </summary>
        /// <param name="eventId">Id of the event that are going to be updated</param>
        /// <param name="categoryID">Id of the category for add the event</param>
        /// <param name="startTime">Start date of the event</param>
        /// <param name="endTime">End date of the event</param>
        /// <param name="comments">Optional comments</param>
        /// http://localhost:54413/updateEvent?eventId=35&categoryId=1&startTime=2019-05-17T08:30:30
        /// <returns>True or false if event has been updated or not</returns>
        [HttpGet]
        [Route(EndpointManager.UpdateEvent)]
        public ObjectResult UpdateEvent(int eventId, int categoryId, string start, string end, string comments = stringEmpty) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (DateTime.TryParse(start, out DateTime startTime) &&
                eventId > 0 && categoryId > 0 && startTime.Year > 1) {
                try {
                    // Get the category of the event
                    var query = db.Categories.ById(categoryId);
                    if (query == null || query.Count() < 1) {
                        // The given category name doesn't exists in the database
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, string.Format(string.Format(Properties.Resources.errorCategoryDoesntExists)));
                    } else {
                        Category category = query.FirstOrDefault();
                        bool updated;
                        if (string.Compare(stringNull, end) == 0 || string.IsNullOrEmpty(end)) {
                            updated = db.Events.Update(eventId, category, startTime, null, comments, DateTime.UtcNow);
                        } else {
                            updated = db.Events.Update(eventId, category, startTime, DateTime.Parse(end), comments, DateTime.UtcNow);
                        }
                        db.SaveChanges();
                        // Prepare results
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, updated);
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
        /// Add a new event to a given user id
        /// </summary>
        /// <param name="eventId">Id of the event that are going to be deleted</param>
        /// <returns>True or false if event has been deleted or not</returns>
        [HttpGet]
        [Route(EndpointManager.DeleteEvent)]
        public ObjectResult DeleteEvent(int eventId) {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (eventId > 0) {
                try {
                    bool deleted = db.Events.Delete(eventId);
                    db.SaveChanges();
                    // Prepare results
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, deleted);
                } catch (Exception exception) {
                    objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
                }
            } else {
                // Bad request
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.BadRequest, new { error = string.Format(string.Format(Properties.Resources.errorBadParameters)) });
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }
        #endregion

        [HttpGet]
        [Route(EndpointManager.GetAllUserEvents)]
        public ObjectResult GetAllUserEvents(string login, long start, long end) {
            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            // Check parameters and do the logic
            if (!string.IsNullOrEmpty(login)) {
                try {
                    // Get the active user
                    List<Event> events = new List<Event>();
                    User user = db.Users.ByLogin(login)?.FirstOrDefault();
                    if (user != null) {
                        List<Event> auxEvents = db.Events.GetAllActiveFromUser(user.Id).ToList();
                        DateTime startAux = (new DateTime(1970, 1, 1)).AddMilliseconds(start);
                        DateTime endAux = (new DateTime(1970, 1, 1)).AddMilliseconds(end);
                        foreach (Event e in auxEvents) {
                            if (e.StartAt >= startAux && e.StartAt <= endAux) {
                                events.Add(e);
                            }
                        }
                        events = events.OrderByDescending(x => x.StartAt).ToList();
                        objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, events);
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
    }


}